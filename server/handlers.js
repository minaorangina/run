var request = require('request');
var getTrainArrivals = require('./lib/getTrainArrivals.js');

var credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

var tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});
var INTERVAL_ID = '';
var NUM_ARRIVALS = 3;
var stBarnabasChurch = '490012633S';
var mileEnd = '490000146G';
var westHamDLR = '940GZZDLWHM';
var woolwichDLR = '940GZZDLWLA';
var canningTownDLR = '940GZZDLCGT';

var handlers = {

    getTfLArrivals: function (io, mode, direction) {

        var stopPoint;

        if (!mode) {
            io.emit('error', new Error("Transport mode not supplied"));
            return;
        }
        if (!direction) {
            io.emit('error', new Error("Direction not supplied"));
            return;
        }
        if (mode === 'dlr') {

            stopPoint = (direction === 'home' ? westHamDLR : woolwichDLR);

        } else if (mode === 'bus') {

            stopPoint = (direction === 'home' ? stBarnabasChurch : mileEnd);
        }
        if (INTERVAL_ID) {
            clearInterval(INTERVAL_ID);
        }
        pollAPI(io, tfl, stopPoint, mode, direction);
    },

    getTrainArrivals: getTrainArrivals
};

function pollAPI (io, api, stopPoint, mode, direction) {

    getDataFromAPI();

    INTERVAL_ID = setInterval(() => {
        getDataFromAPI(io, api, stopPoint, mode, direction);
    }, 10000);

    function getDataFromAPI () {

        api.get('StopPoint/' + stopPoint + '/Arrivals', function (err, response, body) {

            var results = JSON.parse(body);

            if (!results || results.httpStatusCode === 404) {

                io.emit('error', new Error("Could not get arrivals from TfL"));
                return;
            }
            if (mode === 'dlr') {

                if (direction === 'home') {

                    results = results.filter(function (arrival) {

                        return arrival.destinationNaptanId === woolwichDLR;
                    });
                }
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
            .slice(0, NUM_ARRIVALS);
            io.emit(mode + ':arrivals', { data: results, direction: direction });
        });
    }
}

module.exports = handlers;
