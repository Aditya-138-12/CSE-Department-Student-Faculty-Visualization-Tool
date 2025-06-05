module.exports = function registerSocketHandlers(io) {

    const onlineUsers = new Map();

    function emitOnlineUsers(onlineNamesArray, io) {
        io.emit('online-users', onlineNamesArray);
    }

    io.on('connection', (socket) => {
        console.log(`A user has Connected with Socket ID: ${socket.id}`);

        // onlineUsers.set(socket.id, socket.userName);
        // const onlineNamesArray = Array.from(onlineUsers.values());
        // console.log("Online users are: " + onlineNamesArray);
        // emitOnlineUsers(onlineNamesArray, io);

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} has disconnected`);
            onlineUsers.delete(socket.id);
            const onlineNamesArray = Array.from(onlineUsers.values());
            console.log("Online users are: " + onlineNamesArray);
            emitOnlineUsers(onlineNamesArray, io);
        });

        socket.on('user-name', (msg) => {
            console.log(`User with Socket ID: ${socket.id}, Entered Name: ${msg}`);
            socket.userName = msg;
            onlineUsers.set(socket.id, { message: msg, isTyping: false });
            const onlineNamesArray = Array.from(onlineUsers.values());
            console.log("Online users are: " + onlineNamesArray);
            emitOnlineUsers(onlineNamesArray, io);
        });

        socket.on('send-message', (msg) => {
            console.log(`Message received by user ${socket.id}:\n Name: ${msg.userName}:\n Message: ${msg.message}\n\n broadcasting it to all users`);
            socket.broadcast.emit('server-broadcast', msg);
        });

        socket.on('user-typing', (msg) => {
            onlineUsers.set(socket.id, msg);
            const onlineNamesArray = Array.from(onlineUsers.values());
            emitOnlineUsers(onlineNamesArray, io);
        });

    });

};
