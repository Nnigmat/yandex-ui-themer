import { cn } from '@bem-react/classname'
import React, { FC, useState } from 'react'
import { TokenType } from '../../model/tokensToShow'
import { ExpandButton } from '../ExpandButton'
import { TokenField } from '../TokenField'

const cnTokens = cn('Tokens')

const AMOUNT_TO_HIDE = 4

const prettyLabelName = (token: TokenType, group: string) => {
  if (group === token.label) {
    const parts = token.label.split('-')
    return parts[parts.length - 1]
  }

  return token.label.replace(group + '-', '')
}

export type TokenGroupProps = {
  name: string
  tokens: TokenType[]
}

export const TokenGroup: FC<TokenGroupProps> = ({ name, tokens }) => {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => setOpened(true)

  return (
    <div className={cnTokens('Section')}>
      <h4 className={cnTokens('SectionHeader')}>{name}</h4>

      <div>
        {(opened ? tokens : tokens?.slice(0, AMOUNT_TO_HIDE))?.map((token) => (
          <TokenField {...token} key={token.label} label={prettyLabelName(token, name)} />
        ))}
        {!opened && tokens.length > AMOUNT_TO_HIDE && (
          <ExpandButton amount={tokens.length} onPress={handleOpen} />
        )}
      </div>
    </div>
  )
}
