import { combine } from 'effector'
import { $allTokensObject, $changes } from './tokens'

export const $cssVariables = combine(
  { changes: $changes, tokens: $allTokensObject },
  ({ changes, tokens }) => {
    return Object.keys(changes).reduce(
      (acc, name) => ({
        ...acc,
        [`--${name}`]: tokens[name].value,
      }),
      {},
    ) as Record<string, string>
  },
)

export const $cssText = $cssVariables.map((variables) => {
  const cssText = Object.keys(variables).reduce(
    (acc: string, v: string) => `${acc}  ${v}: ${variables[v]};\n`,
    '',
  )
  return `:root {\n${cssText}}`
})
