import { addLayersToFrame, defaultFont, getDropOffset } from 'html-figma/figma';
import {
    FigmaMessageType,
    FigmaMessages,
    FigmaPluginMessages,
} from '../../../src/FigmaMessageType';
import { Token, TokenValue, TokenValueKeys } from '../../../src/TokenTypes';
import { updateNode } from './helpers/updateNode';
import { setTokenToNode } from './setTokenToNode';

//@ts-ignore
figma.showUI(__html__, {
    width: 750,
    height: 600,
});

const postMessage = (data: FigmaPluginMessages) => {
    figma.ui.postMessage(data);
};

const getPluginData = (node: SceneNode) => {
    const tokens = node.getPluginData('tokens');
    const componentData = node.getPluginData('componentData');

    return {
        tokens: tokens ? JSON.parse(tokens) : null,
        componentData: componentData ? JSON.parse(componentData) : null,
    };
};

interface setPluginDataPayload {
    tokens?: Token[];
    componentData?: { name: string; props: unknown };
}

const setPluginData = (node: SceneNode, payload: setPluginDataPayload) => {
    const { tokens, componentData } = payload;

    tokens && node.setPluginData('tokens', JSON.stringify(tokens));
    componentData &&
        node.setPluginData('componentData', JSON.stringify(componentData));
};

const setTokens = (nodeId: SceneNode['id'], tokens: Token[]) => {
    const node = figma.currentPage.findOne((node) => node.id === nodeId);

    if (!node) {
        console.error(`Can't find NodeId: ${nodeId}`);
        return;
    }

    for (const token of tokens) {
        setTokenToNode(node, token);
    }
    setPluginData(node, { tokens });
};

const updateTokensOnNode = (
    node: SceneNode,
    nodeTokens: Token[],
    allTokens: Record<string, string>
) => {
    const newTokens = nodeTokens.map((token) => {
        const newValue = allTokens[token.name];
        if (typeof newValue !== 'undefined') {
            const keys = Object.keys(token.value) as TokenValueKeys[];
            for (const key of keys) {
                if (token.value[key] !== newValue) {
                    // @ts-expect-error
                    token.value[key] = newValue;
                }
            }
        }

        return token;
    });

    setTokens(node.id, newTokens);
};

figma.on('selectionchange', () => {
    const nodes = figma.currentPage.selection;
    if (!nodes.length) {
        postMessage({ type: FigmaMessageType.CLEAR_SELECTION });
        return;
    } else {
        postMessage({
            type: FigmaMessageType.SELECT_NODE,
            data: {
                nodes: nodes.map((n) => ({
                    nodeId: n.id,
                    ...getPluginData(n),
                })),
            },
        });
    }
});

const getVarinatNameFromProps = (props: Record<string, string>) => {
    return Object.keys(props)
        .filter((key) => key !== 'children')
        .map((key) => `${key}=${props[key]}`)
        .join(', ');
};

figma.ui.onmessage = async (msg: FigmaMessages) => {
    if (msg.type === FigmaMessageType.IMPORT_VARIANTS) {
        await figma.loadFontAsync(defaultFont);
        const {
            data: { layers, componentsData },
        } = msg;

        let baseFrame: PageNode | FrameNode = figma.currentPage;

        let nodes: SceneNode[] = [];
        const componentLayers = layers.map((layer) => ({
            ...layer,
            type: 'COMPONENT',
        }));
        // @ts-expect-error
        await addLayersToFrame(componentLayers, baseFrame, ({ node, parent }) => {
            if (!parent) {
                nodes.push(node);
            }
        });


    }

    if (msg.type === FigmaMessageType.IMPORT) {
        await figma.loadFontAsync(defaultFont);
        let baseFrame: PageNode | FrameNode = figma.currentPage;

        const { data } = msg;
        let { nodes, type } = data;

        let addedNodes: SceneNode[] = [];

        if (type === 'variants') {
            const { x, y } = figma.viewport.center;
            
            let offsetTop = 0;
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].layer.x = x;
                nodes[i].layer.y = y + offsetTop;
                offsetTop += (nodes[i].layer.height || 100) + 10;

            }
        }

        for (const { id, layer, position, componentData } of nodes) {
            const figmaNode = id && figma.currentPage.findOne(n => n.id === id);

            if (figmaNode) {
                updateNode(figmaNode, layer);
                setPluginData(figmaNode, { componentData });
            } else {
                if (position) {
                    const { x, y } = getDropOffset(position);
                    layer.x = x;
                    layer.y = y;
                }
                const componentLayer = {
                    ...layer,
                    type: type === 'variants' ? 'COMPONENT' : 'FRAME',
                }

                // @ts-expect-error
                await addLayersToFrame([componentLayer], baseFrame, ({ node, parent }) => {
                    if (!parent) {
                        setPluginData(node, { componentData });
                        addedNodes.push(node);
                    }
                });
            }
        }

        if (type === 'variants') {
            const componentNode = figma.combineAsVariants(addedNodes as ComponentNode[], baseFrame);
            componentNode.name = nodes[0].componentData.name;

            addedNodes.forEach((node, index) => {
                node.name = getVarinatNameFromProps(nodes[index].componentData.props as Record<string, string>)
            });
        }
    }

    if (msg.type === FigmaMessageType.APPLY_TOKEN) {
        const { data } = msg;
        for (let node of data.nodes) {
            setTokens(node.nodeId, node.tokens || []);
        }
    }

    if (msg.type === FigmaMessageType.APPLY_TOKENS) {
        const { data } = msg;
        console.log(data);
        const allNodes = figma.currentPage.findAll((_) => true);
        const nodesWithTokens = allNodes
            .map((node) => ({ tokens: getPluginData(node).tokens, node }))
            .filter(({ tokens }) => tokens);

        for (let { tokens, node } of nodesWithTokens) {
            updateTokensOnNode(node, tokens, data.tokens);
        }
    }
};
