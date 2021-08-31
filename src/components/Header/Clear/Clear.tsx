import React, { FC } from 'react'
import { Button, IButtonProps as ButtonProps } from '@yandex-lego/components/Button/desktop/bundle'

import { tokensReset } from '../../../model/tokens'

export const Clear: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} view="clear" size="m" onClick={tokensReset}>
      Сбросить
    </Button>
  )
}
