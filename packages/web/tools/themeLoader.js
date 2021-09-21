const { compile } = require('@yandex/themekit-core')
const { loadTheme } = require('@yandex/themekit/lib/utils/theme-loader')
const fs = require('fs')
const path = require('path')

const themes = [
  {
    source: '../src/themes/example.theme.json',
    destination: path.resolve('src/themes/example/theme.json')
  },
  {
    source: '../src/themes/example-brand.theme.json',
    destination: path.resolve('src/themes/example-brand/theme.json')
  },
  {
    source: '../src/themes/example-inverse.theme.json',
    destination: path.resolve('src/themes/example-inverse/theme.json')
  },
]

/**
 * Loads theme based on the `source` file configuration and stores to `destination`.
 */
const load = ({ source, destination }) => {
  const theme = loadTheme(require.resolve(source))

  const build = compile({
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

  const properties = JSON.parse(build.json[0].content)
  const defaultValues = properties.reduce((acc, {name, original}) => ({ ...acc, [name]: String(original.value)}), {})

  const toWrite = JSON.stringify({ ...theme, defaultValues} , null, 2).replace('aliases', 'mappings')
  const resolvedDestination = path.resolve(destination)

  fs.mkdirSync(path.dirname(resolvedDestination), { recursive: true }, console.log)
  fs.writeFileSync(resolvedDestination, toWrite)
}

themes.forEach(load)
