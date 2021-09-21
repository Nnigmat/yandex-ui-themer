const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            const babelLoader = webpackConfig.module.rules[1].oneOf[2];

            babelLoader.include = [path.resolve('./src'), path.resolve('../ui/src')];
            return webpackConfig; 
        }
    },
}