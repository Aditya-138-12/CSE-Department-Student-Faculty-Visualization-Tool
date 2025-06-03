module.exports = function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
        console.log(`A user has Connected with Socket ID: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} has disconnected`)
        });

        socket.on('user-name', (msg) => {
            console.log(`User with Socket ID: ${socket.id}, Entered Name: ${msg}`);
            socket.userName = msg;
        });

        socket.on('send-message', (msg) => {
            console.log(`Message received by user ${socket.id}:\n Name: ${msg.userName}:\n Message: ${msg.message}\n\n broadcasting it to all users`);
            socket.broadcast.emit('server-broadcast', msg);
        });

    });

};
