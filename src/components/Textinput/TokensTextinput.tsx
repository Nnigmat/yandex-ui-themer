import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

import { TextinputBase, TextinputBaseProps } from './TextinputBase'

export const cnTokensTextinput = cn('TokensTextinput')

export type TokensTextinputProps = TextinputBaseProps & {}

export const TokensTextinput: FC<TokensTextinputProps> = ({ ...restProps }) => {
  return (
    <div className={cnTokensTextinput()}>
      <TextinputBase {...restProps} />
    </div>
  )
}
