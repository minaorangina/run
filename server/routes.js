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
        path: '/{someFile*}',
        handler: {
            directory: {
                path: '../dist',
                redirectToSlash: false,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/getArrivals',
        handler: function (request, reply) {

            var mode = request.query.mode;

            if (mode === 'train') {

                handlers.getTrainArrivals(request, reply);
            }
            if (mode === 'dlr' || mode === 'bus') {

                handlers.getTfLArrivals(request, reply)
            }
        }
    }
];
module.exports = routes;
