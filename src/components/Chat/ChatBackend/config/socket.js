module.exports = function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
        console.log(`A user has Connected with Socket ID: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} has disconnected`)
        });

    });

};
