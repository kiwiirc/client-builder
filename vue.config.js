const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    publicPath: '',
    assetsDir: 'static/',
    runtimeCompiler: true,
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: false,
            files: '{src,static}/**/*.{vue,htm,html,css,sss,less,scss}',
        },
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, 'static'),
                        to: path.join(__dirname, 'dist/static'),
                        toType: 'dir',
                        globOptions: {
                            ignore: ['.*'],
                        },
                    },

                ],
            }),
        ],
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].template = path.join(__dirname, 'index.html');
            args[0].minify = false;
            return args;
        });
    },
    devServer: {
        port: 8180,
    },
};
