const request = require('request');
const credentials = '&app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY;

const tfl = request.defaults({
    baseUrl: 'https://api.tfl.gov.uk',
    qs: credentials
});
let INTERVAL_ID = '';
const NUM_ARRIVALS = 3;
const HOME_BUS = process.env.HOME_BUS;
const AWAY_BUS = process.env.AWAY_BUS;
const HOME_DLR = process.env.HOME_DLR;
const AWAY_DLR = process.env.AWAY_DLR;

module.exports = function getTfLArrivals (io, mode, direction) {

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

        stopPoint = (direction === 'home' ? HOME_DLR : AWAY_DLR);

    } else if (mode === 'bus') {

        stopPoint = (direction === 'home' ? HOME_BUS : AWAY_BUS);
    }
    if (INTERVAL_ID) {
        clearInterval(INTERVAL_ID);
    }
    pollAPI(io, tfl, stopPoint, mode, direction);
};

function pollAPI (io, api, stopPoint, mode, direction) {

    const url = mode === 'dlr' ?
                `Line/${mode}/Arrivals/${stopPoint}?direction=${direction === 'home' ? 'outbound' : 'inbound'}` :
                `StopPoint/${stopPoint}/Arrivals`;


    getDataFromAPI(url);

    // INTERVAL_ID = setInterval(getDataFromAPI, 10000);

    function getDataFromAPI (url) {
        
        api.get(url, function (err, response, body) {

            let data = JSON.parse(body);
            console.log('data!!!', Object.keys(data));
            if (!data || parseInt(data.httpStatusCode, 10) >= 400 ) {
                console.error(data.httpStatusCode, data.message);
                io.emit(`${mode}:error`, new Error("Could not get arrivals from TfL"));
                return;
            }
            if (mode === 'dlr' && direction === 'home') {

                data = data.filter(function (arrival) {

                    return arrival.destinationNaptanId === AWAY_DLR;
                });
            }
            data = data.sort(function (a, b) {

                if (a.expectedArrival < b.expectedArrival) {
                    return -1;
                } else if (a.expectedArrival > b.expectedArrival) {
                    return 1;
                } else {
                    return 0;
                }
            })
            .slice(0, NUM_ARRIVALS);
            const origin = data.length > 0 ? data[0].stationName : null;
            const destination = data.length > 0 ? data[0].destinationName : null;
            io.emit(mode + ':arrivals', { data, direction, origin, destination });
        });
    }
}
