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

import groupBy from 'lodash.groupby'

import { toHEXA } from '../utils/color'
import { extractParams } from '../utils/extractParams'

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

const tokensPass = createEvent<Array<Token>>()

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

export const $rawTokens = createStore<Array<Token>>([])

export const $allTokens = combine(
  { theme: $theme, tokens: $rawTokens },
  ({ theme: { defaultValues }, tokens }) =>
    tokens.map(({ comment, ...token }) => ({
      ...token,
      defaultValue: defaultValues[token.name],
      changed: defaultValues[token.name] !== token.value,
      type: getType(token.value),
      description: comment,
    })),
)

export const $allTokensObject = $allTokens.map<Record<string, Token>>((tokens) =>
  tokens.reduce((acc, token) => ({ ...acc, [token.name]: token }), {}),
)

export const $globalTokens = $allTokens.map((tokens) => {
  const globals: Record<string, typeof tokens[0]> = {}

  tokens.forEach((token) => {
    const path = token.path[0]

    if (excludeComponentsList.includes(path) || componentsList.includes(path)) {
      return
    }

    globals[token.name] = token
  })

  return globals
})
// Current selected component to be shown
export const $component = createStore<string>('overview')

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
// Tokens of the component
// export const $tokens = combine(
//   {
//     theme: $theme,
//     mappings: $invertedTokenMappings,
//     selectedComponent: $component,
//     resolvedChanges: $resolvedTokens,
//     changes: $designTokens,
//   },
//   ({
//     theme: {
//       tokens: { globals, components },
//     },
//     changes,
//     resolvedChanges,
//     mappings,
//     selectedComponent,
//   }) => {
//     const tokens = selectedComponent === 'overview' ? globals : components[selectedComponent]
//     const mergedTokens = lodashMerge(tokens, resolvedChanges);

//     return Object.entries(mergedTokens).map<TokenType>(([tokenName, token]) => {
//       // Initial type of the token
//       const baseType = getType(String(token.value))
//       const tokenChanged = typeof resolvedChanges[tokenName]?.value !== 'undefined'
//       const value = tokenChanged ? resolvedChanges[tokenName].value : String(token.value)

//       // Current type of the token (can become link)
//       const rawValue = transformMappings((changes[tokenName] || {}).rawValue || '', mappings, true)
//       const type = getType(rawValue || value)
//       const changed = value !== token.value

//       let resultToken: any
//       switch (type) {
//         case 'text':
//           resultToken = { value }
//           break
//         case 'color':
//           const [hex, alpha] = toHEXA(value)
//           resultToken = { hex, alpha, color: value }
//           break
//         case 'link':
//           const params = extractParams(rawValue)

//           // TODO: добавить поддержку для нескольких ссылок
//           // Пример: padding: {size-l} {size-l}
//           // Сейчас оно работает только для одной ссылки
//           if (params) {
//             resultToken = {
//               link: params[0].token,
//               isColor: baseType === 'color',
//               colorValue: value,
//             }
//           }
//       }

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

$rawTokens.on(tokensPass, (_, tokens) => tokens)

let observer = new ThemekitObserver({
  tokens: $theme.getState().tokens,
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
})

tokenUpdate.watch(({ name, value }) => observer.update(name, value))
tokenBatchUpdate.watch((tokens) =>
  tokens.forEach(({ name, value }) => observer.update(name, value)),
)


export type TokenBase = {
  label: string
  groups: string[]
  path: string[]
  description: string
  defaultValue: string
  rawValue: string
  changed: boolean
  name: string
}

export type TokenType = TokenBase &
  (
    | { type: 'text'; value: string }
    | {
        type: 'color'
        hex: string
        alpha: string
        color: string
      }
    | {
        type: 'link'
        link: string
        isColor: boolean
        colorValue: string
      }
  )

export const componentChange = createEvent<string>()
export const tokenChange = createEvent<string>()
export const tokenReset = createEvent()
export const activeTabChange = createEvent<string>()
export const currentPropsChange = createEvent<{
  name: string
  value: unknown
}>()
export const currentCombinedPropsChange = createEvent<{
  name: string
  value: unknown
}>()

export interface Prop {
  name: string
  description: string
  type: {
    required: boolean
    name: 'node' | 'boolean' | 'string' | 'number' | 'enum' | 'array' | 'object'
  }
  options?: string[]
  defaultValue: unknown
}
interface IComponent {
  block: string
  props: Prop[]
}

interface ComponentState {
  allProps: Prop[]
  currentProps: Record<string, unknown>
  currentCombinedProps: Record<string, unknown>
}

// Current selected component to be shown
export const $componentProps = createStore<ComponentState>({
  allProps: [],
  currentProps: {},
  currentCombinedProps: {},
})

// Current selected token to be edited
export const $token = createStore<string>('')
export const $tokenPresent = $token.map((token) => token.length > 0)

const getTokenGroups = (name: string) => {
  const parts = name.split('-')

  return parts.map((_, index) => parts.slice(0, index + 1).join('-')).reverse()
}

// Tokens of the component
export const $tokens = combine(
  {
    globals: $globalTokens,
    components: $componentTokens,
    selectedComponent: $component,
  },
  ({ globals, components, selectedComponent }) => {
    const tokens = selectedComponent === 'overview' ? globals : components[selectedComponent]

    return Object.entries(tokens).map<TokenType>(([tokenName, token]) => {
      const {
        type: baseType,
        original: { value: rawValue },
        value,
        changed,
      } = token

      const type = getType(rawValue || value)

      let resultToken: any
      switch (type) {
        case 'text':
          resultToken = { value }
          break
        case 'color':
          const [hex, alpha] = toHEXA(value)
          resultToken = { hex, alpha, color: value }
          break
        case 'link':
          const params = extractParams(rawValue)

          // TODO: добавить поддержку для нескольких ссылок
          // Пример: padding: {size-l} {size-l}
          // Сейчас оно работает только для одной ссылки
          if (params) {
            resultToken = {
              link: params[0].token,
              isColor: baseType === 'color',
              colorValue: value,
            }
          }
      }

      return {
        ...token,
        ...resultToken,
        label: tokenName,
        name: tokenName,
        groups: getTokenGroups(tokenName),
        type,
        defaultValue: token.value,
        rawValue,
        changed,
      }
    })
  },
)

export const $tokensGrouped = combine(
    {
      tokens: $tokens,
    },
    ({
        tokens,
    }) => {
      const groupsCount = tokens.reduce<Record<string, number>>((res, { label, groups }) => {
        for (const group of groups) {
          res[group] = res[group] ? res[group] + 1 : 1
        }
  
        return res
      }, {})
  
      return groupBy(tokens, ({ groups }) => {
          return groups.find(group => groupsCount[group] >= 3) || groups[0];
      })
    },
  )