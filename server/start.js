require('dotenv').config();
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
const port = process.env.PORT || 9009;
const io = socket.listen(server);
io.on('connection', socketRouter);

server.listen(port, function () {
    console.info(`🌍 Server is listening on port ${port}. Ready to accept requests!`);
});
