'use strict';

module.exports = {
    entry: "public/src/app.jsx",
    output: {
        path: __dirname,
        filename: "public/bundle.js"
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
                loaders: ["sass-loader", "css-loader", "style-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["css-loader", "style-loader"]
            }
        ]
    }
};
