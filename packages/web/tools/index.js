const { ThemekitObserver } = require('@yandex/themekit-core')
const theme = require('../src/themes/example/theme.json')

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

observer.watch((result) => console.log(JSON.parse(result.json[0].content)))
