import { htmlToFigma } from 'html-figma/browser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PlainLayerNode } from 'html-figma/types';
import { PluginMessageEvent, FigmaMessageType } from './FigmaMessageType';
import { pluginMessage } from './utils/figma';
import {
    getComponentByName,
    AllComponentsNames,
} from './utils/getComponentByName';

const body = document.body;

export const ComponentRendererInit = (el: HTMLElement) => {
    const handler = (e: PluginMessageEvent) => {
        const message = e.data;

        if (message.type === FigmaMessageType.RENDER_TOKENS_SYNC) {
            const tokens = message.data;
            for (const key of Object.keys(tokens)) {
                body.style.setProperty(key, tokens[key]);
            }
        }

        if (message.type === FigmaMessageType.RENDER) {
            const components = message.data.blocks;

            const html = ReactDOMServer.renderToStaticMarkup(
                // @ts-ignore
                components.map((block) => {
                    const component = getComponentByName(
                        block.name as AllComponentsNames
                    );
                    // @ts-expect-error
                    const { children, ...props } = block.props || {};

                    return React.createElement(
                        'div',
                        { style: { position: 'absolute', left: 0, top: 0 } },
                        // @ts-expect-error
                        React.createElement(component, props, children)
                    );
                })
            );

            el.style.setProperty('min-height', '200px');
            el.style.setProperty('min-width', '200px');
            el.innerHTML = html;
            const layers = htmlToFigma(el as HTMLElement) as PlainLayerNode;

            el.innerHTML = '';
            
            const result = layers.children as PlainLayerNode[];

            pluginMessage(
                {
                    type: FigmaMessageType.IMPORT,
                    data: {
                        nodes: result.map(({ children }, index) => {
                            const layer = children[0];
                            const { name, props, figmaId } = components[index];
                            const position = message.data.position;

                            return {
                                id: figmaId,
                                layer,
                                componentData: { name, props },
                                position
                            }
                        }),
                        type: message.data.type
                    },
                },
                true
            );
        }
    };

    window.addEventListener('message', handler);
};
