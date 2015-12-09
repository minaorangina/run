var http = require('http');
var routes = require('./routes.js');

http.createServer(routes).listen(8080, function () {

    console.log("Listening on port 8080");
});
