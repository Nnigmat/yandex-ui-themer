import React, { ChangeEventHandler, FC, useState } from 'react';
import { useStore } from 'effector-react';
import { cn } from '@bem-react/classname';
import { Button, Icon, Input, Switch, Textarea } from 'react-figma-components';

import { Divider } from '../../../../lib/lego/Divider';
import { TooltipStateful } from '../../../../lib/lego/Tooltip';
import { $selectedToken, closeEditor } from './model';
import { TipIcon } from '../../../../icons';
import './TokenEditor.css';
import { Color } from './Color';
import { ColorPicker } from '../../../../components/ColorPicker';
import { tokenUpdate } from '../../../../model/tokens';

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
    } = useStore($selectedToken);
    const [inherit, setInherit] = useState(inheritDefault);
    const [value, setValue] = useState(rawValue);

    const handleSwitchChange = () => setInherit((prev) => !prev);
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setValue(e.target.value);
    const handleColorChange = setValue;

    const handleSave = () => {
        // tokenUpdate(value);
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
                <div className={cnTokenEditor('Input')}>
                    {inherit && type === 'color' && (
                        <div>
                            {/* <ColorPicker color={} shape="square" /> */}
                            <Input value={value} onChange={handleInputChange} />
                        </div>
                    )}
                    {!inherit && type === 'text' && (
                        <Input value={value} onChange={handleInputChange} />
                    )}
                    {/* {!inherit && type === 'color' && <Color color={value} />} */}
                </div>
                <div className={cnTokenEditor('Actions')}>
                    <Button view="primary" onPress={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};
