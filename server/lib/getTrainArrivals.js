"use strict";
const soap = require('soap');

const url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2015-05-14';
const accessToken = '<AccessToken><TokenValue>' + process.env.TOKEN + '</TokenValue></AccessToken>';

let INTERVAL_ID = '';

function getTrainArrivals (io, mode, direction) {

    if (INTERVAL_ID) {
        clearInterval(INTERVAL_ID);
    }
    pollAPI(io, mode, direction);
}

function pollAPI (io, mode, direction) {

    soap.createClient(url, function (err, client) {

        if (err) {
            console.error('Error creating client...');
            io.emit(`${mode}:error`, new Error(`Error creating soap client ${err.message}`));
        }

        const away = {
            numRows: 9,
            crs: process.env.AWAYWARDS_ORIGIN_TRAIN,
            filterCrs: process.env.AWAYWARDS_DESTINATION_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        const home = {
            numRows: 9,
            crs: process.env.HOMEWARDS_ORIGIN_TRAIN,
            filterCrs: process.env.AWAYWARDS_ORIGIN_TRAIN,
            filterType: 'to',
            timeOffset: 0,
            timeWindow: 120
        };

        const args = direction === 'home' ? home : away;
        client.addSoapHeader(accessToken);
        client.GetDepBoardWithDetails(args, function (err, result) {
            if (err) {
                console.error('Error getting departures...');
                console.error(`${mode}:error`, err.response.toJSON());
                io.emit(`${mode}:error`, err.response.toJSON());
                return;
            }
            const stationBoard = result.GetStationBoardResult;
            const data = stationBoard.trainServices ? stationBoard.trainServices.service.slice(0, 6) : [];
            const origin = direction === 'away' ? process.env.AWAYWARDS_ORIGIN_TRAIN_NAME : process.env.AWAYWARDS_DESTINATION_TRAIN_NAME;
            io.emit(`${mode}:arrivals`, { data, direction, origin, destination: stationBoard.filterLocationName, last_updated: new Date().toISOString() });
        });

        INTERVAL_ID = setInterval(() => {
            getTrainArrivals(io, mode, direction);
        }, 10000);
    });
}

module.exports = getTrainArrivals;
