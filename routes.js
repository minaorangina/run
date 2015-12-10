var Wreck = require('wreck');

var busstop = 'https://api.tfl.gov.uk/StopPoint/490012632K?app_id='+ process.env.APP_ID +'&app_key=' + process.env.APP_KEY;

var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            console.log("inside handler");
            Wreck.get(busstop, function (err, response, payload) {

                reply(payload.toString());
            });
        }
    }
];
module.exports = routes;
