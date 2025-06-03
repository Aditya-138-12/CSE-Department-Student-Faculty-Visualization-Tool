require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const registerSocketHandlers = require('./config/socket')


const app = express();

// Middlewares
//app.use(cors({ origin: process.env.TEST_CLIENT_ORIGIN }));

// http Routes
app.use('/api', require('./routes/index'));

const server = http.createServer(app);

// Initialize socket.io

const io = new Server(server, {
    cors: {
        origin: process.env.TEST_CLIENT_ORIGIN,
        methods: ["GET", "POST"]
    }
});

// Register Socket handlers
registerSocketHandlers(io);

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server has spinned up on PORT: http://localhost:${PORT}`);
});