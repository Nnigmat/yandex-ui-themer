import { cn } from '@bem-react/classname';
import React, { FC, useCallback, useState } from 'react';
import { IconButton } from 'react-figma-components';
import { tokenChange } from '../../model/tokens';
import { TokenType } from '../../model/tokensToShow';
import { ExpandButton } from '../../../components/ExpandButton';
import { Section } from '../../../components/Section/Section';
import { TokenField } from '../TokenField';

const cnTokens = cn('Tokens');

const AMOUNT_TO_HIDE = 4;

const prettyLabelName = (token: TokenType, group?: string) => {
    if (!group) return token.label;
    if (group === token.label) {
        const parts = token.label.split('-');
        return parts[parts.length - 1];
    }

    return token.label.replace(group + '-', '');
};

export type TokenGroupProps = {
    name?: string;
    tokens?: TokenType[];
    addNewToken?: boolean;
};

export const TokenGroup: FC<TokenGroupProps> = ({
    name,
    tokens = [],
    addNewToken,
}) => {
    const [opened, setOpened] = useState(false);

    const handleOpen = useCallback(() => setOpened(true), []);

    const onAddNewToken = useCallback(() => {
        tokenChange(`${name !== 'globals' ? name + '-' : ''}<new-token>`);
    }, [name]);

    return (
        <Section
            header={
                <>
                    {name}{' '}
                    {addNewToken ? (
                        <IconButton
                            name="plus"
                            onClick={onAddNewToken}
                            className={cnTokens('AddTokenBtn')}
                        />
                    ) : null}
                </>
            }
        >
            <div>
                {(opened ? tokens : tokens?.slice(0, AMOUNT_TO_HIDE))?.map(
                    (token) => (
                        <TokenField
                            {...token}
                            key={token.label}
                            label={prettyLabelName(token, name)}
                        />
                    )
                )}
                {!opened && tokens.length > AMOUNT_TO_HIDE && (
                    <ExpandButton amount={tokens.length} onPress={handleOpen} />
                )}
            </div>
        </Section>
    );
};
