import { combine } from 'effector';

// import { $component } from '../../pages/componentsPage/model';

import { toHEXA } from '../utils/color';
// import { $currentNodes } from '../../model/figma';
import { $allTokensDeps, $allTokensObject, $componentTokens, $globalTokens, TokenStoreType } from './tokens';

export type TokenBase = {
    label: string;
    name: string;
    groups: string[];
    deps?: TokenType[];
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


const getTokenGroups = (name: string) => {
    const parts = name.split('-');

    return parts
        .map((_, index) => parts.slice(0, index + 1).join('-'))
        .reverse();
};

export const mapToken = (token: TokenStoreType) => {
    const {
        original: { value: rawValue },
        type: baseType,
        name,
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
        name,
        label: name,
        groups: getTokenGroups(name),
        rawValue,
    };
}

export const mapTokens = (tokens: Record<string, TokenStoreType>, deps?: Record<string, TokenStoreType[]>,) => {
    return Object.entries(tokens).map<TokenType>(([_, token]) => {
        // Current type of the token (can become link)
        const preparedToken = mapToken(token);

        preparedToken.deps = deps ? deps[token.name]?.map(mapToken) : null;

        return preparedToken;
    });
} 

// Tokens of the selected component
export const $tokens = combine(
    {
        globals: $globalTokens,
        deps: $allTokensDeps,
        components: $componentTokens,
    },
    ({ globals, components, deps }) => {
        return {
            globals: mapTokens(globals, deps),
            components: Object.keys(components).reduce<Record<string, TokenType[]>>((res, key) => { 
                res[key] = mapTokens(components[key], deps);

                return res;
            }, {})
        };
    }
);

// // Tokens of the selected component
// export const $selectedTokens = combine(
//     {
//         allTokens: $allTokensObject,
//         deps: $allTokensDeps,
//         currentNodes: $currentNodes
//     },
//     ({ allTokens, currentNodes }) => {
//         if (!currentNodes || currentNodes.length === 0) return null;

//         const tokens = currentNodes[0]?.tokens?.map(token => {
//             return allTokens[token.name];
//         });

//         return mapTokens(tokens, deps);
//     }
// );
