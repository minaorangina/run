const http = require('http');
const express = require('express');
const morgan = require('morgan');
const socket = require('socket.io');
const socketRouter = require('./socketRouter.js');

if (!process.env.APP_ID) {
    console.error('Please set environment variables');
    process.exit(1);
}

const app = express();
app.use(express.static('dist'));
app.use(morgan('combined'));

const server = http.createServer(app);
const io = socket.listen(server);
io.on('connection', socketRouter);

server.listen(9009, function () {
    console.info('🌍 Server is listening on port 9009. Ready to accept requests!');
});
