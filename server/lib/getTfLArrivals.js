const request = require('request');
const credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

const tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});
let INTERVAL_ID = '';
const NUM_ARRIVALS = 3;
const AWAYWARDS_ORIGIN_DLR = process.env.AWAYWARDS_ORIGIN_DLR;
const AWAYWARDS_DESTINATION_DLR = process.env.AWAYWARDS_DESTINATION_DLR;
const HOMEWARDS_ORIGIN_DLR = process.env.HOMEWARDS_ORIGIN_DLR;
const HOMEWARDS_DESTINATION_DLR = process.env.HOMEWARDS_DESTINATION_DLR;

function getTfLArrivals (io, mode, direction) {

    let stopPoint;

    if (!mode) {
        io.emit(`${mode}:error`, new Error("Transport mode not supplied"));
        return;
    }
    if (!direction) {
        io.emit(`${mode}:error`, new Error("Direction not supplied"));
        return;
    }
    if (mode === 'dlr') {
        stopPoint = (direction === 'away' ? AWAYWARDS_ORIGIN_DLR : HOMEWARDS_ORIGIN_DLR);
    }
    if (INTERVAL_ID) {
        clearInterval(INTERVAL_ID);
    }
    pollAPI(io, tfl, stopPoint, mode, direction);
}

function pollAPI (io, api, stopPoint, mode, direction) {

    const url = mode === 'dlr' ?
                `Line/${mode}/Arrivals/${stopPoint}?direction=${direction === 'away' ? 'inbound' : 'outbound'}` :
                `StopPoint/${stopPoint}/Arrivals`;

    api.get(url, function (err, response, body) {
        if (!body) {
            io.emit(`${mode}:error`, new Error("Could not get arrivals from TfL"));
            return;
        }
        let data = JSON.parse(body);
        if (parseInt(data.httpStatusCode, 10) >= 400 ) {
            console.error(data.httpStatusCode, data.message);
            io.emit(`${mode}:error`, new Error("Could not get arrivals from TfL"));
            return;
        }
        if (mode === 'dlr') {
            if (direction === 'away') {
                data = data.filter(function (arrival) {
                    return arrival.destinationNaptanId === AWAYWARDS_DESTINATION_DLR;
                });
            } else {
                data = data.filter(function (arrival) {
                    return arrival.destinationNaptanId === HOMEWARDS_DESTINATION_DLR;
                });
            }
        }
        data = data.slice(0, NUM_ARRIVALS);
        const origin = data.length > 0 ? data[0].stationName : null;
        const destination = data.length > 0 ? data[0].destinationName : null;
        io.emit(mode + ':arrivals', { data, direction, origin, destination, last_updated: new Date().toISOString() });
    });

    INTERVAL_ID = setInterval(() => {
        getTfLArrivals(io, mode, direction);
    }, 10000);
}

module.exports = getTfLArrivals;
