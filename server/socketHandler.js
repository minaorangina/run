var getTfLArrivals = require('./handlers.js').getTfLArrivals;

function socketHandler (io) {

    console.log("something has connected");
    io.on('dlr', (direction) => {
        console.log("lets take the dlr " + direction);

        getTfLArrivals(io, 'dlr', direction);

    });
}

module.exports = socketHandler;
