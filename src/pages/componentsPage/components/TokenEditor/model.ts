import { combine } from 'effector'
import { $allTokensObject } from '../../../../model/tokens'
import { $token, tokenReset } from '../../model'

export type SelectedTokenType = {}

export const closeEditor = tokenReset

export const $selectedToken = combine(
  { token: $token, tokens: $allTokensObject },
  ({ token, tokens }) => ({
    token,
    description: tokens[token]?.comment,
  }),
)
