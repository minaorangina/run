"use strict";
var soap = require('soap');

var url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2015-05-14';
var accessToken = '<AccessToken><TokenValue>' + process.env.TOKEN + '</TokenValue></AccessToken>';

function getTrainArrivals (request, reply) {

    soap.createClient(url, function (err, client) {

        if (err) {
            console.log('Error...');
            throw err;
        }

        var args = {
            numRows: 9,
            crs: 'NWX',
            filterCrs: null,
            filterType: null,
            timeOffset: null,
            timeWindow: null
        };

        // console.log(client.wsdl.xml);
        client.addSoapHeader(accessToken);
        client.GetDepBoardWithDetails(args, function (err, result) {

            if (err) {
                console.log('error...');
                throw err;
            }
            console.log(result);
        });
    });
}

module.exports = getTrainArrivals;
