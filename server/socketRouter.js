const getTfLArrivals = require('./lib/getTfLArrivals');
const getTrainArrivals = require('./lib/getTrainArrivals');

function socketRouter (io) {

    io.on('dlr', (direction) => {
        getTfLArrivals(io, 'dlr', direction);
    });

    io.on('bus', (direction) => {
        getTfLArrivals(io, 'bus', direction);
    });

    io.on('train', (direction) => {
        getTrainArrivals(io, 'train', direction);
    });
}

module.exports = socketRouter;
