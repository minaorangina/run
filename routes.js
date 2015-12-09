var router = require('router')();

function routes (request, response) {

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write("Hello world"); //response body
    response.end(); // close connection
}

module.exports = routes;
