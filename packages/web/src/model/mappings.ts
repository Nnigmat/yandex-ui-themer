import { $allTokens } from '../Tokens/model/tokens';
import { MappingsType } from '../types';

/**
 * Object for design tokens mappings storing
 *
 * @example
 *
 * {
 *  'button-view-action-fill-color-base': 'button.viewAction.fillColor.base.value',
 * }
 */
export const $tokenMappings = $allTokens.map<MappingsType>((tokens) =>
    tokens.reduce((acc, { name, path }) => {
        const mappedName = [...path, 'value'].join('.');
        return { ...acc, [name]: mappedName };
    }, {})
);

/**
 * Object for design tokens mappings storing
 *
 * @example
 *
 * {
 *  'button.viewAction.fillColor.base.value': 'button-view-action-fill-color-base',
 * }
 */
export const $invertedTokenMappings = $allTokens.map<MappingsType>((tokens) =>
    tokens.reduce((acc, { name, path }) => {
        const mappedName = [...path, 'value'].join('.');
        return { ...acc, [mappedName]: name };
    }, {})
);
