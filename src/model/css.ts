import { combine } from 'effector'
import { $changes, $rawTokens } from './tokens'

export const $cssVariables = combine({ changes: $changes, tokens: $rawTokens }, ({ changes }) => {
  return Object.entries(changes).reduce(
    (acc, [name, { value }]) => ({
      ...acc,
      [`--${name}`]: value,
    }),
    {},
  ) as Record<string, string>
})

export const $cssText = $cssVariables.map((variables) => {
  const cssText = Object.keys(variables).reduce(
    (acc: string, v: string) => `${acc}  ${v}: ${variables[v]};\n`,
    '',
  )
  return `:root {\n${cssText}}`
})
