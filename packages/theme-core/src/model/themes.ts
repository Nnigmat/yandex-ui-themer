import { createStore, createEvent, combine } from 'effector'

import { theme as themeDefault } from '@yandex-lego/components/Theme/presets/default'
import { theme as themeInverse } from '@yandex-lego/components/Theme/presets/inverse'
import { theme as themeBrand } from '@yandex-lego/components/Theme/presets/brand'

import dataDefault from '../themes/example/theme.json'
import dataInverse from '../themes/example-inverse/theme.json'
import dataBrand from '../themes/example-brand/theme.json'

import { ThemeType, ThemeNamesType } from '../types'

export const themeChange = createEvent<ThemeNamesType>()

export const $themes = createStore<Record<string, ThemeType>>({
  default: {
    ...dataDefault,
    preset: themeDefault,
  },
  inverse: {
    ...dataInverse,
    preset: themeInverse,
  },
  brand: {
    ...dataBrand,
    preset: themeBrand,
  },
})

export const $themesNames = $themes.map((themes) => Object.keys(themes))

export const $themeName = createStore<ThemeNamesType>('default')
export const $theme = combine($themes, $themeName, (themes, themeName) => themes[themeName])

$themeName.on(themeChange, (_, themeName) => themeName)
