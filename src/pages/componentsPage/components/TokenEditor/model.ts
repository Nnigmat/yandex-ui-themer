import { combine } from 'effector';
import { $allTokensObject } from '../../../../model/tokens';
import { $token, tokenReset } from '../../../../model/tokens';

export type SelectedTokenType = {};

export const closeEditor = tokenReset;

export const $selectedToken = combine(
    { token: $token, tokens: $allTokensObject },
    ({ token, tokens }) => {
        const {
            description = '',
            refs = [],
            type = 'text',
            name = '',
            original: { value: rawValue = '' },
        } = tokens[token] || { original: { value: '' } };

        return {
            token,
            description,
            inherit: refs.length > 0,
            type,
            rawValue,
            name,
        };
    }
);

$selectedToken.watch(console.log);
