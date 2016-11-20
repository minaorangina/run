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
            crs: process.env.AWAY_TRAIN,
            filterCrs: process.env.HOME_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        var fromHome = {
            numRows: 9,
            crs: process.env.HOME_TRAIN,
            filterCrs: process.env.AWAY_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        var args = request.query.direction === 'toHome' ? toHome : fromHome;

        client.addSoapHeader(accessToken);
        console.log(args);
        client.GetDepBoardWithDetails(args, function (err, result) {


            if (err) {
                console.log('Error getting departures...');
                console.log(Object.keys(err));
                console.log(err.response.toJSON());
                return reply(err);
            }
            var stationBoard = result.GetStationBoardResult;

            // console.log(stationBoard);

            var results = {
                destination: stationBoard.filterLocationName,
                arrivals: stationBoard.trainServices ? stationBoard.trainServices.service : []
            };

            reply(results);
        });
    });
}

module.exports = getTrainArrivals;
