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

            reply(body);
        });


    }
};

module.exports = handlers;
