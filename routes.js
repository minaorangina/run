var handlers = require('./handlers.js');

var routes = [
    {
        method: 'GET',
        path: '/',
        handler: {
            file: 'index.html'
        }
    },
    {
        method: 'GET',
        path: '/static/{someFile*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: false,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/getBusArrivals',
        handler: handlers.getBusArrivals
    },
    {
        method: 'GET',
        path: '/getDLRArrivals',
        handler: handlers.getDLRArrivals
    },
    {
        method: 'GET',
        path: '/getTrainArrivals',
        handler: handlers.getTrainArrivals
    }
];
module.exports = routes;
