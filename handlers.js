var request = require('request');

var credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

var tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});

var woolwichDLR = '940GZZDLWLA';

var handlers = {

    getBusArrivals: function (request, reply) {

        var stBarnabasChurch = '490012633S';

        tfl.get('StopPoint/' + stBarnabasChurch + '/Arrivals', function (err, response, body) {

            var results = body;

            if (results) {

                var results = JSON.parse(body).sort(function (a, b) {

                    if (a.expectedArrival < b.expectedArrival) {
                        return -1;
                    } else if (a.expectedArrival > b.expectedArrival) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .slice(0, 5);
            }

            reply(results);
        });
    },

    getDLRArrivals: function (request, reply) {

        var westHamDLR = '940GZZDLWHM';

        tfl.get('StopPoint/' + westHamDLR + '/Arrivals', function (err, response, body) {

            var results = body;

            if (results) {

                results = JSON.parse(body).filter(function (arrival) {

                    return arrival.destinationNaptanId === woolwichDLR;
                })
                .filter(function (arrival) {

                    return arrival.timeToStation !== 0;
                })
                .sort(function (a, b) {

                    if (a.expectedArrival < b.expectedArrival) {
                        return -1;
                    } else if (a.expectedArrival > b.expectedArrival) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .slice(0, 2);
            }


            reply(results);
        });
    },

    getTrainArrivals: require('./lib/getTrainArrivals.js')
};

module.exports = handlers;
