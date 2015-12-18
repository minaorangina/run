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
        var allBusArrivals = 'StopPoint/' + stBarnabasChurch + '/Arrivals';

        tfl.get(allBusArrivals, function (err, response, body) {

            var sorted = JSON.parse(body).sort(function (a, b) {

                if (a.expectedArrival < b.expectedArrival) {
                    return -1;
                } else if (a.expectedArrival > b.expectedArrival) {
                    return 1;
                } else {
                    return 0;
                }
            });

            reply(sorted.slice(0, 5));
        });
    },

    getDLRArrivals: function (request, reply) {

        var westHamDLR = '940GZZDLWHM';
        var westHamDLRArrivals = 'StopPoint/' + westHamDLR + '/Arrivals';

        tfl.get(westHamDLRArrivals, function (err, response, body) {

            var results = JSON.parse(body).filter(function (arrival) {

                return arrival.destinationNaptanId === woolwichDLR;
            })
            .sort(function (a, b) {

                if (a.expectedArrival < b.expectedArrival) {
                    return -1;
                } else if (a.expectedArrival > b.expectedArrival) {
                    return 1;
                } else {
                    return 0;
                }
            });

            console.log(results.slice(0, 5));
            // reply(sorted.slice(0, 5));
        });
    }
};

module.exports = handlers;
