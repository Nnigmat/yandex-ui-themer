import { combine } from 'effector'
import deepmerge from 'deepmerge'
import YAML from 'yaml'

import { ParamsType } from '../types'
import { PARAM_DOT_RE } from '../utils/constants'
import { extractParams } from '../utils/extractParams'
import { toDeepToken } from '../utils/toDeepToken'
import { $changes, $allTokensObject } from './tokens'

export const $yamlText = combine(
  {
    changes: $changes,
    tokens: $allTokensObject,
  },
  ({ changes, tokens }) => {
    if (Object.keys(changes).length === 0) {
      return ''
    }

    // Make object for yaml from changes
    const yml = Object.values(changes).reduce(
      (acc, { path, value }) => [...acc, toDeepToken(path, value)],
      [] as any,
    )

    // Get all params from changes values
    const params = Object.values(changes).reduce<ParamsType[]>(
      (acc, { value }) => [...acc, ...(extractParams(value, PARAM_DOT_RE) || [])],
      [],
    )

    // If param is in the theme and it was not redefined then add theme's value to the yaml
    params
      .map(({ token }) => token)
      .filter((token) => !(token in changes))
      .forEach((token) => {
        if (tokens[token]) {
          const { path, value } = tokens[token]
          yml.push(toDeepToken(path, { value }))
        }
      })

    console.log(yml)
    const deepmergedYml = deepmerge.all(yml)
    return YAML.stringify(deepmergedYml)
  },
)
