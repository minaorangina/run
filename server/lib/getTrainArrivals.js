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

        const fromHome = {
            numRows: 9,
            crs: process.env.AWAY_TRAIN,
            filterCrs: process.env.HOME_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        const toHome = {
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
            const data = stationBoard.trainServices ? stationBoard.trainServices.service.slice(0, 4) : [];
            const origin = direction === 'home' ? process.env.HOME_TRAIN_STATION_NAME : process.env.AWAY_TRAIN_STATION_NAME;
            io.emit(`${mode} :arrivals`, { data, direction, origin, destination: stationBoard.filterLocationName });
        });
    });
}

module.exports = getTrainArrivals;
