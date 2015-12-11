var Wreck = require('wreck');

var stBarnabasChurch = '490012633S';
var arrivals = 'https://api.tfl.gov.uk/Line/277/Arrivals?stopPointId='+ stBarnabasChurch +'&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

var options = {
    payload: 'string'
};

var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function getBusArrivals(request, reply) {

            Wreck.request('GET', arrivals, options, function (err, res) {

                Wreck.read(res, {json: 'smart'}, function (err, body) {

                    var nextTwoDepartures = body.sort(function (a, b) {

                        if (a.expectedArrival < b.expectedArrival) {
                            return -1;
                        } else if (a.expectedArrival > b.expectedArrival) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    console.log(nextTwoDepartures);
                    reply(nextTwoDepartures.toString());
                });
            });
        }
    }
];
module.exports = routes;
