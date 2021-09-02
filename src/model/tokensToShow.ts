import { createStore, createEvent, combine } from 'effector';

import groupBy from 'lodash.groupby';
import { $component } from '../pages/componentsPage/model';

import { toHEXA } from '../utils/color';
import { $componentTokens, $globalTokens } from './tokens';

export type TokenBase = {
    label: string;
    name: string;
    groups: string[];
    path: string[];
    description: string;
    defaultValue: string;
    rawValue: string;
    changed: boolean;
};

export type TokenType = TokenBase &
    (
        | { type: 'text'; value: string }
        | {
              type: 'color';
              hex: string;
              alpha: string;
              color: string;
          }
        | {
              type: 'link';
              link: string;
              isColor: boolean;
              colorValue: string;
          }
    );

export const tokenChange = createEvent<string>();
export const tokenReset = createEvent();
export const activeTabChange = createEvent<string>();
export const currentPropsChange = createEvent<{
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
interface IComponent {
    block: string;
    props: Prop[];
}

interface ComponentState {
    allProps: Record<string, Prop>;
    currentProps: Record<string, unknown>;
}

// Current selected token to be edited
export const $token = createStore<string>('');
export const $tokenPresent = $token.map((token) => token.length > 0);

const getTokenGroups = (name: string) => {
    const parts = name.split('-');

    return parts
        .map((_, index) => parts.slice(0, index + 1).join('-'))
        .reverse();
};

// Tokens of the selected component
export const $tokens = combine(
    {
        globals: $globalTokens,
        components: $componentTokens,
        selectedComponent: $component,
    },
    ({ globals, components, selectedComponent }) => {
        const tokens =
            selectedComponent === 'overview'
                ? globals
                : components[selectedComponent];

        return Object.entries(tokens).map<TokenType>(([tokenName, token]) => {
            // Current type of the token (can become link)
            const {
                original: { value: rawValue },
                type: baseType,
                refs,
                value,
            } = token;
            let resultToken: any;
            if (refs.length > 0) {
                resultToken = {
                    link: refs[0].name,
                    isColor: baseType === 'color',
                    colorValue: value,
                    type: 'link',
                };
            } else if (baseType === 'color') {
                const [hex, alpha] = toHEXA(value);
                resultToken = { hex, alpha, color: value, type: 'color' };
            } else {
                resultToken = { value, type: 'text' };
            }

            return {
                ...token,
                ...resultToken,
                name: tokenName,
                label: tokenName,
                groups: getTokenGroups(tokenName),
                rawValue,
            };
        });
    }
);

export const $tokenGroups = $tokens.map((tokens) => {
    const groupsCount = tokens.reduce<Record<string, number>>(
        (res, { groups }) => {
            for (const group of groups) {
                res[group] = res[group] ? res[group] + 1 : 1;
            }

            return res;
        },
        {}
    );

    return groupBy(tokens, ({ groups }) => {
        return groups.find((group) => groupsCount[group] >= 3) || groups[0];
    });
});
