var Hapi = require('hapi');
var Path = require('path');
var inert = require('inert');
var socket = require('socket.io');
var routes = require('./routes.js');
var socketHandler = require('./socketHandler.js');

var server = new Hapi.Server({

    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../dist')
            }
        }
    }
});

server.register(inert, function () {});

server.connection({
    port: Number(process.env.PORT || 9009)
});

server.route(routes);


server.start(function () {

    console.info("Server running at port:", server.info.uri);
});
