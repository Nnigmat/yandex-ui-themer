import { MappingsType } from '../types'
import { compile, parseYaml } from '@yandex/themekit-core'

import { getType } from '../utils/tokenType'

export const downloadTheme = async (content: string, mappings: MappingsType) => {
  const res = compile({
    tokens: [parseYaml(content)],
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

  const properties = JSON.parse(res.json[0].content)

  const tokens = Object.entries(properties).map(([_, item]: any) => ({
    path: item.path,
    name: item.name,
    value: item.value,
    rawValue: item.original.value,
    changed: true,
    type: getType(item.value),
  }))

  return tokens
}
