import React from 'react';
import { useStore } from 'effector-react';
import { cn } from '@bem-react/classname';

import { $componentTokens } from '../../Tokens/model/tokens';

import './ComponentsPage.css';
import { Panels } from './components/Panels';
import { Playground } from './components/Playground';
import { TokenEditor } from '../../Tokens/components/TokenEditor';
import { Showcase } from './components/Showcase';
import { $component, componentChange } from './model';

const cnComponentsPage = cn('ComponentsPage');

export const ComponentsPage = () => {
    const { components } = useStore($componentTokens);
    const component = useStore($component);

    const panels = ['overview', ...Object.keys(components || [])];
    const handlePanelSelection = (panel: string) => {
        componentChange(panel);
    };

    return (
        <div className={cnComponentsPage()}>
            <Panels
                className={cnComponentsPage('Panels')}
                panels={panels}
                activePanel={component}
                onPanelSelect={handlePanelSelection}
            />
            <Showcase className={cnComponentsPage('Showcase')} />
            <Playground className={cnComponentsPage('Playground')} />
            {/* <button onClick={() => tokenChange('token-name')}>Token Editor</button> */}

        </div>
    );
};
