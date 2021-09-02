import { createStore, createEvent } from 'effector';

export const activeTabChange = createEvent<string>();
export const componentChange = createEvent<string>();

// Current tab to show
export const $activeTab = createStore<string>('');

// Current component to show
export const $component = createStore<string>('overview');

$activeTab.on(activeTabChange, (_, activeTab) => activeTab);
$component.on(componentChange, (_, component) => component);
