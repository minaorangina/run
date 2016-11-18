var getTfLArrivals = require('./handlers.js').getTfLArrivals;

function socketHandler (io) {

    io.on('dlr', (direction) => {
        getTfLArrivals(io, 'dlr', direction);
    });

    io.on('bus', (direction) => {
        getTfLArrivals(io, 'bus', direction);
    });
}

module.exports = socketHandler;
