'use strict';

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('../../webpack.dev.config.js');

var compiler = webpack(config);

var options = {
    contentBase: 'dist/',
    hot: true,
    publicPath: "/assets/",
    filename: 'bundle.js',
    stats: {
        colors: true
    }
};

var server = new WebpackDevServer(compiler, options);

server.listen(8080, 'localhost', function () {
    console.log('webpack-dev-server now running');
});
