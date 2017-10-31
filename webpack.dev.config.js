/*eslint-disable*/

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        "./src/js/app.js",
        "webpack/hot/dev-server",
        "webpack-dev-server/client?http://localhost:8080/"
    ],
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        proxy: {
          '*': {
            target: 'http://localhost:9009'
          }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
