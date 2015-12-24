var request = require('request');

var credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

var tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});

var stBarnabasChurch = '490012633S';
var westHamDLR = '940GZZDLWHM';
var woolwichDLR = '940GZZDLWLA';

var handlers = {

    getTfLArrivals: function (request, reply) {

        var query = request.query;
        var stopPoint;

        if (query.mode === 'dlr') {

            stopPoint = westHamDLR;

        } else if (query.mode === 'bus') {

            stopPoint = stBarnabasChurch;

        }


        tfl.get('StopPoint/' + stopPoint + '/Arrivals', function (err, response, body) {

            var results = JSON.parse(body);

            if (!results) {

                throw new Error("Could not get arrivals from TfL");

            } else {

                if (stopPoint === westHamDLR) {

                    results = results.filter(function (arrival) {

                        return arrival.destinationNaptanId === woolwichDLR;
                    });
                }

                results = results.sort(function (a, b) {

                    if (a.expectedArrival < b.expectedArrival) {
                        return -1;
                    } else if (a.expectedArrival > b.expectedArrival) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .slice(0, 5)

                reply(results);
            }
        });
    },

    getDLRArrivals: function (request, reply) {



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
