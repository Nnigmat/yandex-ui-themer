import { useStore } from 'effector-react';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Switch, Textarea } from 'react-figma-components';
import { $cssText } from '../../../model/css';
import { $isFigma } from '../../../model/view';

import {
    rawTokensUpload,
    tokensUpdate,
    $tokensText,
} from '../../../Tokens/model/tokensText';
import { tokensShare, $shareTokensDisabled } from '../../../model/share-tokens';
import { $tokens } from '../../../Tokens/model/tokensToShow';

import './Tokens.css';
import { applyAllTokensToFigma } from '../../../utils/figma';
import { TokensStore } from '../../../Tokens/components/Tokens/TokensStore';
import { $changes } from '../../../Tokens/model/tokens';

export type TokensProps = {};

export const Tokens: FC<TokensProps> = () => {
    const [format, setFormat] = useState<'yaml' | 'css'>('yaml');
    const tokensText = useStore($tokensText);
    const cssText = useStore($cssText);
    const isFigma = useStore($isFigma);
    const changes = useStore($changes);
    const shareDisabled = useStore($shareTokensDisabled);

    const [showTokensCode, setShowTokensCode] = useState(false);

    const switchToCodeHandler = useCallback(() => {
        setShowTokensCode((v) => !v);
    }, []);

    const handleSwitchChange = () =>
        setFormat((format) => {
            switch (format) {
                case 'yaml':
                    return 'css';
                case 'css':
                    return 'yaml';
                default:
                    return 'css';
            }
        });

    const handleTextareaChange = (event: ChangeEvent<HTMLInputElement>) => {
        tokensUpdate(event.target.value);
    };

    const handleUploadClick = () => {
        rawTokensUpload();
    };

    const handlePushToCanvasClick = useCallback(() => {
        // console.log(changes);
        const tokensRecord = Object.keys(changes).reduce<Record<string, string>>((res, key) => {
            res[key] = changes[key].value;

            return res;
        }, {});
        applyAllTokensToFigma({ tokens: tokensRecord });
    }, [changes]);

    return (
        <div className="TokensChanges">
            <div className="TokensChanges-Header">
                <div className="TokensChanges-HeaderItem">
                    <Switch
                        checked={showTokensCode}
                        onChange={switchToCodeHandler}
                        className="TokensChanges-Switch"
                    />
                    Code
                </div>
                {showTokensCode ? (
                    <div className="TokensChanges-HeaderItem">
                        YAML
                        <Switch
                            checked={format !== 'yaml'}
                            onChange={handleSwitchChange}
                            className="TokensChanges-Switch"
                        />
                        CSS
                    </div>
                ) : null}
            </div>
            {!showTokensCode ? (
                <TokensStore />
            ) : (
                <Textarea
                    value={format === 'yaml' ? tokensText : cssText}
                    onChange={handleTextareaChange}
                    className="TokensChanges-Textinput"
                    placeholder="TokensChanges"
                />
            )}
            <div className="TokensChanges-Buttons">
                <Button
                    view="tertiary"
                    onClick={tokensShare}
                    disabled={shareDisabled}
                    onPress={tokensShare}
                    data-testid="share=button"
                >
                    Share Theme
                </Button>
                <Button view="secondary" onPress={handleUploadClick}>
                    Save
                </Button>
                {isFigma && (
                    <Button view="primary" onPress={handlePushToCanvasClick}>
                        Apply to Figma
                    </Button>
                )}
            </div>
        </div>
    );
};
