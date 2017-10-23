const getTfLArrivals = require('./lib/getTfLArrivals');
const getTrainArrivals = require('./lib/getTrainArrivals');

function socketRouter (io) {

    io.on("foo", msg => {
        console.log(msg);
        io.emit('bar', { worked: 'hell yeah!!' });
    });

    io.on('dlr', (direction) => {
        getTfLArrivals(io, 'dlr', direction);
    });

    io.on('bus', (direction) => {
        getTfLArrivals(io, 'bus', direction);
    });

    io.on('train', (direction) => {
        getTrainArrivals(io, direction, true);
    });
}

module.exports = socketRouter;
