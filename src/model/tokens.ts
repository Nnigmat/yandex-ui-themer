import { ThemekitObserver } from '@yandex/themekit-core'
import { combine, createEffect, createEvent, createStore, forward } from 'effector'
import { createGate } from 'effector-react'
import { toast } from 'react-toastify'

import { downloadTokens } from '../api/downloadTokens'
import { ThemeNamesType } from '../types'
import { getQueryParameter } from '../utils/queryParameters'
import { getType } from '../utils/tokenType'
import { tokensQueryParameterUpdate } from './query'
import { componentsList, excludeComponentsList } from './constants'

import { $theme, themeChange } from './themes'

type Token = {
  name: string
  path: string[]
  refs: Token[]
  value: string
  comment: string
  original: {
    value: string
  }
}

const tokensPass = createEvent()

export const tokensInitialization = createEvent()
export const tokenUpdate = createEvent<{
  name: string
  value: string
  path: string[]
  remove?: boolean
}>()
export const tokenBatchUpdate = createEvent<
  { name: string; value: string; path: string[]; remove?: boolean }[]
>()
export const tokensReset = createEvent()

export const tokensChangedSinceLastViewReset = createEvent()

const $observer = $theme.map((theme) => {
  const observer = new ThemekitObserver({
    tokens: theme.tokens,
    output: {
      json: {
        transforms: ['name/param-case', 'value/color-function'],
        files: [
          {
            destination: 'root.json',
            format: 'json/flat',
          },
        ],
      },
    },
  })

  observer.watch((result) => {
    tokensPass(JSON.parse(result.json[0].content))
    console.log(JSON.parse(result.json[0].content))
  })

  tokenUpdate.watch(({ name, value }) => observer.update(name, value))
  tokenBatchUpdate.watch((tokens) =>
    tokens.forEach(({ name, value }) => observer.update(name, value)),
  )

  return observer
})

export const $rawTokens = createStore<Array<Token>>([])

export const $allTokens = combine(
  { theme: $theme, tokens: $rawTokens },
  ({ theme: { defaultValues }, tokens }) =>
    tokens.map((token) => ({
      ...token,
      defaultValue: defaultValues[token.name],
      changed: defaultValues[token.name] !== token.value,
      type: getType(token.value),
    })),
)

export const $allTokensObject = $allTokens.map<Record<string, Token>>((tokens) =>
  tokens.reduce((acc, token) => ({ ...acc, [token.name]: token }), {}),
)

export const $globalTokens = $allTokens.map((tokens) =>
  tokens.filter((token) => {
    const path = token.path[0]

    if (excludeComponentsList.includes(path) || componentsList.includes(path)) {
      return false
    }

    return true
  }),
)

export const $componentTokens = $allTokens.map((tokens) => {
  const components: Record<string, Record<string, typeof tokens[0]>> = {}

  tokens.forEach((token) => {
    const path = token.path[0]

    if (excludeComponentsList.includes(path) || !componentsList.includes(path)) {
      return
    }

    if (!(path in components)) {
      components[path] = {}
    }

    components[path] = {
      ...components[path],
      [token.name]: { ...token },
    }
  })

  return components
})

export const $changes = createStore<Record<string, { value: string; path: string[] }>>({})

export const $hasChanges = $changes.map((tokens) => Object.keys(tokens).length !== 0)

export const $changesArray = $changes.map((tokens) =>
  Object.entries(tokens).map(([name, value]) => ({ name, ...value })),
)

// Видел ли пользователи последние изменения на странице Changes
export const $tokensChangedSinceLastView = createStore(false)

export const tokensInitializationGate = createGate()

export const initializeTokens = createEffect(async () => {
  const tokensHash = getQueryParameter('tokens')

  if (!tokensHash) {
    return
  }

  try {
    const response = await downloadTokens(tokensHash)

    if (!response) {
      throw new Error('No response')
    }

    const { tokens, theme } = response

    themeChange(theme as ThemeNamesType)
    tokenBatchUpdate(tokens)
    tokensQueryParameterUpdate(tokensHash)
    toast.success('Theme successfully downloaded')
  } catch (err) {
    toast.error("Couldn't download the Theme")
  }
})

$changes
  .on(tokenUpdate, (state, { name, value, path, remove }) => {
    if (remove) {
      const newState = { ...state }
      delete newState[name]

      return newState
    }

    return { ...state, [name]: { value, path } }
  })
  .on(tokenBatchUpdate, (state, tokens) => {
    const result = { ...state }

    tokens.forEach(({ name, value, path, remove }) => {
      if (remove) {
        delete result[name]
      } else {
        result[name] = { value, path }
      }
    })

    return result
  })
  .reset(tokensReset)

tokensReset.watch(() => {
  toast.success('All changes reset')
  tokensQueryParameterUpdate()
})

forward({
  from: tokensInitializationGate.open,
  to: initializeTokens,
})

$tokensChangedSinceLastView
  .on(tokenUpdate, () => true)
  .on(tokenBatchUpdate, () => true)
  .reset(tokensChangedSinceLastViewReset)

$globalTokens.watch(console.log)
$componentTokens.watch(console.log)
