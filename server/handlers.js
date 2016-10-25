var request = require('request');
var getTrainArrivals = require('./lib/getTrainArrivals.js');

var credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

var tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});

var stBarnabasChurch = '490012633S';
var westHamDLR = '940GZZDLWHM';
var woolwichDLR = '940GZZDLWLA';

var handlers = {

    getTfLArrivals: function (io, mode, direction) {
        console.log("happening");
        var stopPoint;

        if (!mode) {
            io.emit('error', new Error("Transport mode not supplied"));
        }
        if (!direction) {
            io.emit('error', new Error("Direction not supplied"));
        }
        if (mode === 'dlr') {

            stopPoint = westHamDLR;

        } else if (mode === 'bus') {

            stopPoint = stBarnabasChurch;
        }


        tfl.get('StopPoint/' + stopPoint + '/Arrivals', function (err, response, body) {

            var results = JSON.parse(body);

            if (!results || results.httpStatusCode === 404) {

                io.emit('error', new Error("Could not get arrivals from TfL"));

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
                .slice(0, 5);

                io.emit(mode + ':arrivals', results);
            }
        });
    },

    getTrainArrivals: getTrainArrivals
};

module.exports = handlers;
