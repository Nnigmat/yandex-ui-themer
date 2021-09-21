import React, {
    FC,
    useEffect,
    useState,
    useCallback,
    FocusEventHandler,
} from 'react';
import { cnTextinput } from '@yandex-lego/components/Textinput/Textinput';
import { withDebounceInput } from '@yandex-lego/components/withDebounceInput';
import { Input } from 'react-figma-components';
import debounce from 'lodash.debounce';

import { convertColorObj, hexAndAlphaToRgba } from '../../../utils/color';
import { ColorPicker } from '../../ColorPicker';

import './Color.css';

export type ColorProps = {
    handleColorChange: (color: string) => void;
    color: string;
    hex: string;
    alpha: string;
};

const DebounceInput = withDebounceInput(Input);

export const Color: FC<ColorProps> = ({
    handleColorChange,
    color,
    hex,
    alpha,
}) => {
    const [_hex, setHex] = useState(hex);
    const [_alpha, setAlpha] = useState(alpha);
    const [_color, setColor] = useState(color);

    const handleColorChangeDebounced = useCallback(
        debounce(handleColorChange, 100),
        [handleColorChange]
    );

    useEffect(() => {
        if (hex) {
            setHex(hex);
        }
        if (alpha) {
            setAlpha(alpha);
        }
        if (color) {
            setColor(color);
        }
    }, [hex, alpha, color]);

    const handleInputChange = useCallback(
        (hex: string, alpha: string) => {
            try {
                const color = hexAndAlphaToRgba(hex, alpha.replace('%', ''));
                handleColorChange(color);
            } catch (e) {}
        },
        [handleColorChange]
    );

    const _handleColorChange = useCallback(
        (color: any) => {
            const _color = convertColorObj(color);

            setColor(_color);
            handleColorChangeDebounced(_color);
        },
        [handleColorChangeDebounced]
    );

    const hexChangeHandler = useCallback(
        (event) => handleInputChange(event.target.value, _alpha),
        [_alpha, handleInputChange]
    );
    const alphaChangeHandler = useCallback(
        (event) => handleInputChange(_hex, event.target.value),
        [_hex, handleInputChange]
    );

    const selectTextOnFocus: FocusEventHandler = (event) => {
        // @ts-ignore
        event.target.setSelectionRange(0, event.target.value.length);
    };

    return (
        <>
            <div className={cnTextinput({ type_color: true })}>
                <ColorPicker
                    color={_color}
                    onChange={_handleColorChange}
                    className="Textinput-Picker"
                    shape="square"
                />
                <DebounceInput
                    className="Textinput-Hex"
                    value={_hex}
                    debounceTimeout={500}
                    onChange={hexChangeHandler}
                    maxLength={6}
                    onFocus={selectTextOnFocus}
                />
                <DebounceInput
                    className="Textinput-Alpha"
                    value={_alpha}
                    debounceTimeout={500}
                    onChange={alphaChangeHandler}
                    maxLength={4}
                    onFocus={selectTextOnFocus}
                />
            </div>
        </>
    );
};
