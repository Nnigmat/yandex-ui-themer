import React, { FC, useCallback } from 'react';
import { cnTextinput } from '@yandex-lego/components/Textinput/Textinput';
import { IconButton } from 'react-figma-components';

import { ColorPicker } from '../../../../components/ColorPicker';
import { TokenType } from '../../../../model/tokens';

import './Link.css';

export type LinkProps = TokenType & {
    handleLink: (token: string) => void;
    type: 'link';
};

export const Link: FC<LinkProps> = ({
    name,
    link,
    isColor,
    colorValue,
    handleLink,
}) => {
    const handleLinkHandler = useCallback(() => handleLink(name), [handleLink,name]);
    const handleRefHandler = useCallback(() => handleLink(link), [handleLink, link]);


    return (
        <div className={cnTextinput({ type_link: true })}>
            {isColor && (
                <ColorPicker
                    color={colorValue}
                    shape="circle"
                    className="Textinput-Picker"
                />
            )}
            <div className={cnTextinput('LinkWrapper')}><span className={cnTextinput('Link')} onClick={handleRefHandler}>{link}</span></div>
            <IconButton
                name="break"
                onPress={handleLinkHandler}
                className="Textinput-BreakIcon"
            />
        </div>
    );
};
