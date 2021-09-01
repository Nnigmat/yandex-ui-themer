import { useStore } from 'effector-react'
import React, { FC } from 'react'

import { $tokenGroups } from '../../model/tokensToShow'

import './Tokens.css'
import { TokenGroup } from './TokenGroup'

export type TokensProps = {}

export const Tokens: FC<TokensProps> = () => {
  const tokensGroups = useStore($tokenGroups)
  const groups = Object.keys(tokensGroups)

  return (
    <>
      {groups.map((name) => (
        <TokenGroup name={name} tokens={tokensGroups[name]} />
      ))}
    </>
  )
}
