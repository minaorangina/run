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
        path: '/getTfLArrivals',
        handler: handlers.getTfLArrivals
    },
    {
        method: 'GET',
        path: '/getTrainArrivals',
        handler: handlers.getTrainArrivals
    }
];
module.exports = routes;
