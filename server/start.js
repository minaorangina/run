var Hapi = require('hapi');
var Path = require('path');
var inert = require('inert');
var socket = require('socket.io');
var routes = require('./routes.js');
var socketHandler = require('./socketHandler.js');

if (!process.env.APP_ID) {
    console.error('Please set app environment variables');
    process.exit(1);
}

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
var io = socket(server.listener);

io.on('connection', socketHandler);

server.start(function () {

    console.info("Server running at port:", server.info.uri); //eslint-disable-line no-console
});
