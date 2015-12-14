var request = require('request');

var stBarnabasChurch = '490012633S';
var busNumber = '277';

var credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;
var busArrivalsForOneLine = 'Line/'+ busNumber +'/Arrivals?stopPointId='+ stBarnabasChurch;
var allBusArrivals = 'StopPoint/' + stBarnabasChurch + '/Arrivals';

var tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});


var handlers = {

    getBusArrivals: function (request, reply) {

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

            reply(sorted.slice(0, 3));
        });
    }
};

module.exports = handlers;
