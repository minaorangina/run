"use strict";
const soap = require('soap');

const url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2015-05-14';
const accessToken = '<AccessToken><TokenValue>' + process.env.TOKEN + '</TokenValue></AccessToken>';

function getTrainArrivals (io, mode, direction) {

    soap.createClient(url, function (err, client) {

        if (err) {
            console.error('Error creating client...');
            io.emit(`${mode}:error`, new Error(`Error creating soap client ${err.message}`));
        }

        const toHome = {
            numRows: 9,
            crs: process.env.AWAY_TRAIN,
            filterCrs: process.env.HOME_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        const fromHome = {
            numRows: 9,
            crs: process.env.HOME_TRAIN,
            filterCrs: process.env.AWAY_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        const args = direction === 'home' ? toHome : fromHome;
        client.addSoapHeader(accessToken);
        client.GetDepBoardWithDetails(args, function (err, result) {

            if (err) {
                console.error('Error getting departures...');
                console.error(`${mode}:error`, err.response.toJSON());
                io.emit(`${mode}:error`, err.response.toJSON());
                return;
            }
            const stationBoard = result.GetStationBoardResult;
            const results = {
                destination: stationBoard.filterLocationName,
                arrivals: stationBoard.trainServices ? stationBoard.trainServices.service : []
            };
            io.emit(mode + ':arrivals', { data: results, direction });
        });
    });
}

module.exports = getTrainArrivals;
