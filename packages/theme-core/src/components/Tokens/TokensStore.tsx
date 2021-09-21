import { useStore } from 'effector-react';
import React, { FC, useMemo } from 'react';

import { $token, $tokenPresent } from '../../model/tokens';
import { $tokens, TokenType } from '../../model/tokensToShow';

import './Tokens.css';
import { TokenGroup } from './TokenGroup';
import { TokenEditor } from '../TokenEditor/TokenEditor';
import { cn } from '@bem-react/classname';
import { TokensType } from '../../types';
import groupBy from 'lodash.groupby';
import { Tokens } from './Tokens';

export type TokensProps = {
    component?: 'globals' | 'all' | string;
};

export const TokensStore: FC<TokensProps> = ({ component = 'globals' }) => {
    const tokens = useStore($tokens);
    const showTokenEditor = useStore($tokenPresent);

    const currentTokens =
        component === 'globals' ? tokens.globals : tokens.components[component];
    
    return <Tokens name={component} tokens={currentTokens} showEditor={showTokenEditor} />
};
