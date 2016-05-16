'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        "./src/js/app.jsx",
        "webpack/hot/dev-server",
        "webpack-dev-server/client?http://localhost:8080/"
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "react-hot-loader!babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
