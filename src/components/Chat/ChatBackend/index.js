require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const registerSocketHandlers = require('./config/socket')


const app = express();

// Middlewares
app.use(cors({
    origin: [process.env.MAIN_CLIENT_ORIGIN, process.env.TEST_CLIENT_ORIGIN],
    credentials: true
}));

// Preflight response
app.options('*', cors({
    origin: [process.env.MAIN_CLIENT_ORIGIN, process.env.TEST_CLIENT_ORIGIN],
    credentials: true
}));


// http Routes
app.use('/api', require('./routes/index'));

const server = http.createServer(app);

// Initialize socket.io

const io = new Server(server, {
    cors: {
        origin: [process.env.MAIN_CLIENT_ORIGIN, process.env.TEST_CLIENT_ORIGIN],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Register Socket handlers
registerSocketHandlers(io);

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Server has spinned up on PORT: http://localhost:${PORT}`);
});