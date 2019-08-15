/* eslint-disable vue/html-indent */
const regeneratorRuntime = require("regenerator-runtime");
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./plugin-preview.js",
    output: {
        filename: 'plugin-preview.min.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env'],
            },
        }],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: '0.0.0.0',
    },
    plugins: [
      new UglifyJsPlugin()
    ]
};
