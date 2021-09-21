import { createStore, createEvent } from 'effector';
import { $currentNodes } from '../../model/figma';
import { sendToFigma } from '../../utils/figma';
import { AllComponentsNames, getComponentMetaByName } from '../../utils/getComponentByName';

export const activeTabChange = createEvent<string>();
export const componentChange = createEvent<string>();

// Current tab to show
export const $activeTab = createStore<string>('');

// Current component to show
export const $component = createStore<string>('overview');

$activeTab.on(activeTabChange, (_, activeTab) => activeTab);
$component.on(componentChange, (_, component) => component);
interface IComponent {
    block: string;
    props: Prop[];
}

export const currentPropsChange = createEvent<{
    name: string;
    value: unknown;
}>();
export const currentCombinedPropsChange = createEvent<{
    name: string;
    value: unknown;
}>();

export interface Prop {
    name: string;
    description: string;
    type: {
        required: boolean;
        name:
            | 'node'
            | 'boolean'
            | 'string'
            | 'number'
            | 'enum'
            | 'array'
            | 'object';
    };
    options?: string[];
    defaultValue: unknown;
}
interface ComponentState {
    allProps: Prop[];
    currentProps: Record<string, unknown>;
    currentCombinedProps: Record<string, unknown>;
}

// Current selected component to be shown
export const $componentProps = createStore<ComponentState>({
    allProps: [],
    currentProps: {},
    currentCombinedProps: {},
});

$componentProps.on(componentChange, (_, component) => {
    const currentComponent = getComponentMetaByName(component as AllComponentsNames);
    return {
        allProps: currentComponent.argTypes,
        currentProps: currentComponent.args,
        currentCombinedProps: {},
    };
});
$componentProps.on(
    currentPropsChange,
    ({ allProps, currentProps, currentCombinedProps }, newProp) => {
        const newState = { ...currentProps };
        newState[newProp.name] = newProp.value;

        return { allProps, currentProps: newState, currentCombinedProps };
    }
);

$componentProps.watch(currentPropsChange, ({ currentProps }) => {
    const component = $component.getState();
    const selected = $currentNodes.getState();
    const name = component ? component[0].toUpperCase() + component.slice(1) : null;
    // @ts-expect-error
    if (name && component && selected && selected.length && selected[0].componentData.name === name) {
        sendToFigma({
            blocks: [{ figmaId: selected[0].nodeId, name, props: currentProps }]
        })
    }
});


$componentProps.on(
    currentCombinedPropsChange,
    ({ allProps, currentProps, currentCombinedProps }, newProp) => {
        const newState = { ...currentCombinedProps };
        newState[newProp.name] = newProp.value;

        return { allProps, currentCombinedProps: newState, currentProps };
    }
);
