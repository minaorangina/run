var Wreck = require('wreck');
var credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;
var stBarnabasChurch = '490012633S';
var busNumber = '277';

var busArrivalsForOneLine = 'Line/'+ busNumber +'/Arrivals?stopPointId='+ stBarnabasChurch;
var allBusArrivals = 'StopPoint/' + stBarnabasChurch + '/Arrivals';

var options  = {

    baseUrl: 'https://api.tfl.gov.uk/'
};

var handlers = {

    getBusArrivals: function (request, reply) {

        Wreck.request('GET', allBusArrivals + credentials, options, function (err, res) {
            console.log("res");
            if (err) {
                reply(err);
            }
            Wreck.read(res, {json: 'smart'}, function (err, body) {

                var nextArrivals = body.sort(function (a, b) {

                    if (a.expectedArrival < b.expectedArrival) {
                        return -1;
                    } else if (a.expectedArrival > b.expectedArrival) {
                        return 1;
                    } else {
                        return 0;
                    }
                });


                reply(nextArrivals);
            });
        });
    }
};

module.exports = handlers;
