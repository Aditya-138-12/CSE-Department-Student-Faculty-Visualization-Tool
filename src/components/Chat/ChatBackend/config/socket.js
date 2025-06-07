module.exports = function registerSocketHandlers(io) {

    const db = require('./firebaseAdmin');

    const onlineUsers = new Map();

    const messageArray = new Map();

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
            console.log(`User with Socket ID: ${socket.id}, Entered Name: ${msg.name}`);
            socket.userName = msg;
            onlineUsers.set(socket.id, { message: msg, isTyping: false });
            const onlineNamesArray = Array.from(onlineUsers.values());
            console.log("Online users are: " + onlineNamesArray);
            emitOnlineUsers(onlineNamesArray, io);

        });

        socket.on('send-message', (msg) => {
            console.log(`Message received by user ${socket.id}:\n Name: ${msg.userName}:\n Message: ${msg.message} Time: ${msg.time}\n\n broadcasting it to all users`);
            socket.broadcast.emit('server-broadcast', msg);

            const existingUser = messageArray.get(msg.uuid);
            if (existingUser) {
                existingUser.messagesDetails.push({
                    message: msg.message,
                    time: msg.time
                });
                console.log(existingUser);
            }

            // Here we will push data to the firebase, but keep in mind that, we will relay messages via sockets, this will be for users who come for the first time, so that they can know what is going on.
            db.ref(`chats/${msg.uuid}`).push({
                userName: msg.userName,
                message: msg.message,
                time: msg.time
            });

        });

        socket.on('user-typing', (msg) => {
            onlineUsers.set(socket.id, msg);
            const onlineNamesArray = Array.from(onlineUsers.values());
            emitOnlineUsers(onlineNamesArray, io);
        });

        socket.on('usr-info', async (data) => {
            console.log("User Data: ", data);
            messageArray.set(data.uuid, { name: data.name, messagesDetails: [] })
            console.log(messageArray);

            const chatRef = db.ref(`chats/`);
            const snapshot = await chatRef.once('value');
            console.log(snapshot.val());

            socket.emit('initial-chats', snapshot.val());
        });

    });

};
