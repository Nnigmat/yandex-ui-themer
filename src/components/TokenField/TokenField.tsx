import { Popup } from '@yandex-lego/components/Popup/desktop/bundle';
import { useStore } from 'effector-react';
import React, { useCallback, FC, useMemo, useState, useRef } from 'react';

import { TextinputBase } from '../../components/Textinput';
import { metricaGoal } from '../../components/YaMetrika';
import { $currentNodes, setCurrentNodesToken } from '../../model/figma';
import { tokenUpdate } from '../../model/tokens';
import { tokenChange, TokenType } from '../../model/tokens';
import { TokenValue, TokenValueKeys } from '../../TokenTypes';
import { TokenApply } from '../TokenApply/TokenApply';
import { Text, Color, Link } from './Inputs';
import { TokenPrevious } from './TokenPrevious';

export type TokenProps = TokenType & {
    value?: string | number;
};

export const TokenField: FC<TokenProps> = (props) => {
    const {
        label,
        description,
        type,
        path,
        defaultValue,
        changed,
        name,
    } = props;

    const handleTextChange = useCallback(
        (event) => {
            tokenUpdate({
                name,
                value: event.target.value,
            });
            metricaGoal('change-tokens');
        },
        [path, name]
    );

    const handleColorChange = useCallback(
        (color) => {
            tokenUpdate({
                name,
                value: color,
            });
        },
        [name, path]
    );

    const handleLink = (token: string) => {
        tokenChange(token);
    };

    const handleClear = useCallback(() => {
        tokenUpdate({
            name,
            value: defaultValue,
            remove: true,
        });
    }, [defaultValue, name, path]);

    const inner = useMemo(() => {
        switch (props.type) {
            case 'text':
                return <Text handleChange={handleTextChange} {...props} />;
            case 'color':
                return (
                    <Color
                        handleLink={handleLink}
                        handleColorChange={handleColorChange}
                        {...props}
                    />
                );
            case 'link':
                return <Link handleLink={handleLink} {...props} />;
        }
        // @ts-expect-error
    }, [props.type, props.color, props.colorValue, props.value]);

    const [showApplyToken, setShowApplyToken] = useState(false);
    const labelRef = useRef(null);
    const nodes = useStore($currentNodes);
    const { tokens, nodeId } = nodes[0] || {};

    const selectedNodeToken = tokens
        ? tokens.find((t) => t.name === name)
        : null;
    const tokenValues = selectedNodeToken?.value || {};

    const onTokenApply = useCallback(
        (key: TokenValueKeys[]) => {
            const tokenValue = key.reduce<TokenValue>(
                (res, key) => {
                    if (typeof res[key] === 'undefined') {
                        // @ts-expect-error
                        res[key] = props.value;
                    } else {
                        delete res[key];
                    }
                    return res;
                },
                { ...tokenValues }
            );

            setCurrentNodesToken({ name, value: tokenValue });
        },
        [name, props.value, tokenValues]
    );

    const onLabelClickHandler = useCallback(() => {
        setShowApplyToken((v) => !v);
    }, []);

    return (
        <>
            <TextinputBase labelRef={labelRef} label={label} tip={description}>
                {inner}
            </TextinputBase>
            <Popup
                visible={showApplyToken}
                onClose={onLabelClickHandler}
                hasTail
                target="anchor"
                anchor={labelRef}
                view="default"
            >
                {nodeId ? (
                    <TokenApply
                        name={name}
                        value={props.value as string}
                        description={description}
                        values={tokenValues}
                        onChange={onTokenApply}
                    />
                ) : null}
            </Popup>
            {type === 'color' && changed && (
                <TokenPrevious color={defaultValue} handleClick={handleClear} />
            )}
        </>
    );
};
