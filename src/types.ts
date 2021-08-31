import { Theme } from '@yandex-lego/components/Theme'

export type TokenInfoType = {
  value: string | number
  path: string[]
  description?: string
}

export type TokenRecordType = Record<string, TokenInfoType>

/**
 * @example
 * {
 *  'button-font-size': {
 *    value: '28px',
 *    path: ['button', 'fontSize'],
 *    description: 'The token is responsible for font size of button'
 *  },
 *  'button-line-height': {
 *    value: '28px',
 *    path: ['button', 'lineHeight'],
 *    description: 'The token is responsible for line height of button'
 *  }
 * }
 */
export type GlobalsType = TokenRecordType

/**
 * @example
 * {
 *  'button': {
 *   'button-font-size': {
 *     value: '28px',
 *     path: ['button', 'fontSize'],
 *     description: 'The token is responsible for font size of button'
 *   },
 *   'button-line-height': {
 *     value: '28px',
 *     path: ['button', 'lineHeight'],
 *     description: 'The token is responsible for line height of button'
 *   }
 *  }
 * }
 */
export type ComponentsType = Record<string, TokenRecordType>

export type TokensType = {
  globals: GlobalsType
  components: ComponentsType
}

export type MappingsType = Record<string, string>

export type ThemeType = {
  // TODO: Поменять на тип из @yandex/themekit-core
  tokens: any
  preset: Theme
  mappings: MappingsType
  defaultValues: Record<string, string>
  name?: string
}

export type VariablesType = {
  name: string
  value: string
  path: string[]
}

export type TokensHashType = string

export type ThemeNamesType = 'default' | 'inverse' | 'brand'

export type DesignTokensType = Record<string, VariablesType>
export type ListDesignTokensType = VariablesType[]

export type ParamsType = {
  template: string
  token: string
}
