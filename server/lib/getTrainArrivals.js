"use strict";
var soap = require('soap');

var url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2015-05-14';
var accessToken = '<AccessToken><TokenValue>' + process.env.TOKEN + '</TokenValue></AccessToken>';

function getTrainArrivals (request, reply) {

    soap.createClient(url, function (err, client) {

        if (err) {
            console.log('Error creating client...');
            throw err;
        }

        var toHome = {
            numRows: 9,
            crs: 'WWA',
            filterCrs: 'ERH',
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        var fromHome = {
            numRows: 9,
            crs: 'ERH',
            filterCrs: 'WWA',
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        var args = request.url.query.direction === 'toHome' ? toHome : fromHome;

        client.addSoapHeader(accessToken);
        client.GetDepBoardWithDetails(args, function (err, result) {

            if (err) {
                console.log('Error getting departures...');
                console.log(err);
                throw err;
            }
            var stationBoard = result.GetStationBoardResult;
            if (stationBoard.trainServices) {
                console.log(stationBoard);

                var results = {
                    destination: stationBoard.filterLocationName,
                    arrivals: stationBoard.trainServices.service
                };

                reply(results);
            } else {

                reply({
                    destination: stationBoard.filterLocationName,
                    arrivals: []
                });
            }
        });
    });
}

module.exports = getTrainArrivals;
