import React, { FC, useMemo } from 'react';

import { TokenType } from '../../model/tokensToShow';

import './Tokens.css';
import { TokenGroup } from './TokenGroup';
import { TokenEditor } from '../TokenEditor/TokenEditor';
import { cn } from '@bem-react/classname';
import groupBy from 'lodash.groupby';

export type TokensProps = {
    name?: string;
    tokens: TokenType[];
    showEditor?: boolean;
    addNewToken?: boolean;
};

const cnTokens = cn('Tokens');

export const groupTokens = (tokens: TokenType[]) => {
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
};

export const Tokens: FC<TokensProps> = ({ name, tokens, showEditor, addNewToken = true }) => {
    const currentTokensGroups = useMemo(() => {
        if (!tokens) return [];
        const groups = groupTokens(tokens);

        return Object.keys(groups).map((key) => ({
            name: key,
            tokens: groups[key],
        }));
    }, [tokens]);

    return (
        <div className={cnTokens()}>
            {showEditor ? (
                <TokenEditor className={cnTokens('TokenEditor')} />
            ) : (
                <>  
                    {name !== currentTokensGroups[0]?.name ? (
                        <TokenGroup name={name} addNewToken={addNewToken} />
                    ) : null}
                    {currentTokensGroups.map(({ name, tokens }) => (
                        <TokenGroup key={name} name={name} tokens={tokens} addNewToken={addNewToken} />
                    ))}
                </>
            )}
        </div>
    );
};
