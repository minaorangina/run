var Hapi = require('hapi');
var Path = require('path');
var inert = require('inert');
var routes = require('./routes.js');

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
    port: Number(process.env.PORT || 8000)
});

server.route(routes);

server.start(function () {

    console.log("Server running at port:", server.info.uri);
});
