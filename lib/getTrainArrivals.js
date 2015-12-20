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

        var args = {
            numRows: 9,
            crs: 'WWA',
            filterCrs: 'ERH',
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        client.addSoapHeader(accessToken);
        client.GetDepBoardWithDetails(args, function (err, result) {

            if (err) {
                console.log('Error getting departures...');
                throw err;
            }
            reply(result.GetStationBoardResult.trainServices.service);
        });
    });
}

module.exports = getTrainArrivals;
