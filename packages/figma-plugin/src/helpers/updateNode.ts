import { PlainLayerNode } from "html-figma/types";
import { addLayersToFrame } from 'html-figma/figma';

import { assign } from 'html-figma/figma/helpers';

export const updateNode = async (node: SceneNode, newLayer: PlainLayerNode) => {
    const { 
        // @ts-expect-error
        constraints,
        // @ts-expect-error
        children,
        x, y, name,
        ...restLayerData
    } = newLayer;
    assign(node, restLayerData);

    if ((node as FrameNode).children) {
        (node as FrameNode).children.forEach((child) => child.remove());
    }
    // @ts-expect-error
    if (newLayer.children) {
        // @ts-expect-error
        await addLayersToFrame(newLayer.children.reverse(), node as FrameNode);
    }
    
    return node;
}
