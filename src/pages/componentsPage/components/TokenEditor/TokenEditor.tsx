import React, { ChangeEventHandler, FC, useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { cn } from '@bem-react/classname';
import { Button, Icon, Input, Switch, Textarea } from 'react-figma-components';
import { transformValueWithColorFn } from '@yandex/themekit-core/lib/builtins/value-color-function-transform';

import { Divider } from '../../../../lib/lego/Divider';
import { TooltipStateful } from '../../../../lib/lego/Tooltip';
import { $selectedToken, closeEditor } from './model';
import { BackIcon, TipIcon } from '../../../../icons';
import './TokenEditor.css';
import { Color } from './Color';
import { ColorPicker } from '../../../../components/ColorPicker';
import { $allTokensObject, tokenUpdate } from '../../../../model/tokens';
import { toHEXA } from '../../../../utils/color';
import { extractParams } from '../../../../utils/extractParams';
import { $invertedTokenMappings } from '../../../../model/mappings';
import { PARAM_DOT_RE } from '../../../../utils/constants';
import { IconBack } from '../../../../components/IconBack';

export const cnTokenEditor = cn('TokenEditor');

export type TokenEditorProps = {
    className?: string;
};

export const TokenEditor: FC<TokenEditorProps> = ({ className, ...props }) => {
    const {
        token,
        description,
        inherit: inheritDefault,
        rawValue,
        type,
        name,
        value: resolvedValue,
    } = useStore($selectedToken);
    const tokens = useStore($allTokensObject);
    const mappings = useStore($invertedTokenMappings);
    const [inherit, setInherit] = useState(inheritDefault);
    const [changed, setChanged] = useState(false);
    const [value, setValue] = useState(rawValue);
    const [colorPreview, setColorPreview] = useState(resolvedValue);

    useEffect(() => {
        setValue(inherit ? rawValue : resolvedValue);
        setChanged(false);
    }, [inherit, rawValue, resolvedValue]);

    useEffect(() => {
        if (inherit) {
            setChanged(value !== rawValue);
        } else {
            setChanged(value !== resolvedValue);
        }
    }, [inherit, rawValue, resolvedValue, value]);

    useEffect(() => {
        const tokensToReplace = extractParams(value, PARAM_DOT_RE)?.map(
            ({ token, template }) => ({
                toReplace: template,
                token: mappings[token],
            })
        );

        if (
            !tokensToReplace ||
            !tokensToReplace.every((token) => Boolean(token))
        ) {
            setColorPreview(value);
            return;
        }

        try {
            const toTransform = tokensToReplace.reduce(
                (acc, { token, toReplace }) =>
                    (acc = acc.replace(toReplace, tokens[token].value)),
                value
            );

            setColorPreview(
                transformValueWithColorFn.transformer({
                    // @ts-ignore
                    token: { value: toTransform },
                })
            );
        } catch {
            return;
        }
    }, [mappings, tokens, value]);

    const handleSwitchChange = () => setInherit((prev) => !prev);
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setValue(e.target.value);
    const handleColorChange = setValue;

    const handleReset = () => {
        setValue(inherit ? rawValue : resolvedValue);
    };

    const handleSave = () => {
        tokenUpdate({ name, value });
        closeEditor();
    };

    return (
        <div className={cnTokenEditor(null, [className])} {...props}>
            <div className={cnTokenEditor('Header')}>
                <span>Edit token</span>
                <Icon
                    name="close"
                    color="black"
                    onClick={closeEditor}
                    className={cnTokenEditor('CloseIcon')}
                />
            </div>
            <Divider />
            <div className={cnTokenEditor('Description')}>
                <Input value={token} readOnly />
                {description && <Textarea value={description} readOnly />}
            </div>
            <Divider />
            <div className={cnTokenEditor('Controls')}>
                <div className={cnTokenEditor('Header')}>
                    <span>Properties</span>
                    <div className={cnTokenEditor('Switch')}>
                        <Switch
                            checked={inherit}
                            onChange={handleSwitchChange}
                        />
                        <span>Inheritance</span>
                        <TooltipStateful content="You can use formulas in “color(value h() s() l() a())” format ">
                            <span>
                                <TipIcon className="" />
                            </span>
                        </TooltipStateful>
                    </div>
                </div>
                <div
                    className={cnTokenEditor('Input', {
                        type__color: type === 'color',
                        type__text: type === 'text',
                        inherit: inherit,
                    })}
                >
                    <div className={cnTokenEditor('InputContent')}>
                        {inherit && type === 'color' && (
                            <>
                                <ColorPicker
                                    color={colorPreview}
                                    shape="circle"
                                />
                                <Input
                                    value={value}
                                    onChange={handleInputChange}
                                />
                            </>
                        )}
                        {!inherit && type === 'color' && (
                            <Color
                                color={value}
                                handleColorChange={handleColorChange}
                                hex={toHEXA(value)[0]}
                                alpha={toHEXA(value)[1]}
                            />
                        )}
                        {type === 'text' && (
                            <Input value={value} onChange={handleInputChange} />
                        )}
                        {changed && <BackIcon />}
                    </div>
                    {changed && (
                        <div
                            className={cnTokenEditor('InputPrevious')}
                            onClick={handleReset}
                        >
                            <div className="Title">Initial value</div>
                            <div className="Content">
                                {inherit ? rawValue : resolvedValue}
                            </div>
                        </div>
                    )}
                </div>
                <div className={cnTokenEditor('Actions')}>
                    <Button
                        view="primary"
                        disabled={!changed}
                        onPress={handleSave}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};
