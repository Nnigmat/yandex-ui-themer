import { createStore, createEvent, createEffect, forward, attach } from 'effector'

import { downloadTheme } from '../api/downloadTheme'
import { tokensReset } from './tokens'
import { $yamlText } from './yaml'
import { DesignTokensType, VariablesType, MappingsType } from '../types'
import { $theme } from './themes'

export const $resolvedTokens = createStore<DesignTokensType>({})

const resolvedTokensUpdate = createEvent<VariablesType[]>()

$resolvedTokens
  .on(resolvedTokensUpdate, (_, tokens) =>
    tokens.reduce((acc, token) => ({ ...acc, [token.name]: token }), {}),
  )
  .reset(tokensReset)

export const resolveTokensFx = createEffect(
  async ({ content, mappings }: { content: string; mappings: MappingsType }) => {
    resolvedTokensUpdate(await downloadTheme(content, mappings))
  },
)

export const resolveTokensAttach = attach({
  effect: resolveTokensFx,
  source: $theme,
  mapParams: (content: string, { mappings }) => ({
    content,
    mappings,
  }),
})

forward({ from: $yamlText, to: resolveTokensAttach })
