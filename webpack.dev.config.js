'use strict';

var WebpackOnBuildPlugin = require('on-build-webpack');
var child_process = require('child_process');

module.exports = {
    entry: [
        './public/src/app.jsx'
    ],
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    inline    : true,
    progress  : true,
    colors    : true,
    watch     : true,
};
