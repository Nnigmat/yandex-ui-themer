import { combine } from 'effector';
import { $allTokensDeps, $allTokensObject } from '../../model/tokens';
import { $token, tokenReset } from '../../model/tokens';

export type SelectedTokenType = {};

export const closeEditor = tokenReset;

export const $selectedToken = combine(
    { token: $token, tokens: $allTokensObject, deps: $allTokensDeps },
    ({ token, tokens, deps }) => {
        const {
            description = '',
            refs = [],
            type = 'text',
            name = '',
            original: { value: rawValue = '' },
            value = '',
        } = tokens[token] || { original: { value: '' } };

        return {
            token,
            description,
            inherit: refs.length > 0,
            type,
            deps: deps[token],
            rawValue,
            name,
            value,
        };
    }
);

$selectedToken.watch(console.log);
