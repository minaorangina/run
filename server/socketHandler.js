var getTfLArrivals = require('./handlers.js').getTfLArrivals;

function socketHandler (io) {

    io.on('dlr', (direction) => {

        getTfLArrivals(io, 'dlr', direction);
    });

    io.on('bus', (direction) => {

        getTfLArrivals(io, 'bus', direction);
    });
}

function pollAPI (socket, mode, direction) {

    getTfLArrivals(socket, mode, direction);
    setTimeout(pollAPI(socket, mode, direction), 10000);
}

module.exports = socketHandler;
