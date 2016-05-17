var getTfLArrivals = require('./handlers.js').getTfLArrivals;

function socketHandler (io) {

    console.log("something has connected");
    io.on('dlr', (direction) => {
        console.log("lets take the dlr " + direction);

        getTfLArrivals(io, 'dlr', direction);

    });

    io.on('bus', (direction) => {
        console.log("let's get the bus!");
        getTfLArrivals(io, 'bus', direction);
    });
}

module.exports = socketHandler;
