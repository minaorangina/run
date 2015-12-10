var Hapi = require('hapi');
var routes = require('./routes.js');
var server = new Hapi.Server();

server.connection({port: 8080});
server.route(routes);
server.start(function () {

    console.log("Server running at port:", server.info.uri);
});
