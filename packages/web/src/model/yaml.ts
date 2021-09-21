import { combine } from 'effector';
import deepmerge from 'deepmerge';
import YAML from 'yaml';

import { ParamsType } from '../types';
import { PARAM_DOT_RE } from '../utils/constants';
import { extractParams } from '../utils/extractParams';
import { toDeepToken } from '../utils/toDeepToken';
import { $changes, $allTokensObject } from '../Tokens/model/tokens';

export const $yamlText = combine(
    {
        changes: $changes,
        tokens: $allTokensObject,
    },
    ({ changes, tokens }) => {
        if (Object.keys(changes).length === 0) {
            return '';
        }

        // Make object for yaml from changes
        const yml = Object.keys(changes).reduce(
            (acc, tokenName) => [
                ...acc,
                toDeepToken(tokens[tokenName].path, {
                    value: tokens[tokenName].original.value,
                }),
            ],
            [] as any
        );

        // Get all params from changes values
        const params = Object.keys(changes).reduce<string[]>(
            (acc, tokenName) => [
                ...acc,
                ...(tokens[tokenName].refs.map(({ name }) => name) || []),
            ],
            []
        );

        // If param is in the theme and it was not redefined then add theme's value to the yaml
        params
            .filter((token) => !(token in changes))
            .forEach((token) => {
                if (tokens[token]) {
                    const {
                        path,
                        original: { value },
                    } = tokens[token];
                    yml.push(toDeepToken(path, { value }));
                }
            });

        const deepmergedYml = deepmerge.all(yml);
        return YAML.stringify(deepmergedYml);
    }
);
