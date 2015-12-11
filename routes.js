var handlers = require('./handlers.js');



var routes = [
    {
        method: 'GET',
        path: '/',
        handler: handlers.getBusArrivals
    }
];
module.exports = routes;
