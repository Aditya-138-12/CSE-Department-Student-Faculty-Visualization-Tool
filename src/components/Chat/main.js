import React, { useEffect, useState } from 'react';
import './main.css';
import { io } from 'socket.io-client';

import ChatHeader from './ChatHeader/chatHeader';
import MainChatContainer from './ChatContainer/mainChatContainer';
import ChatEnterName from './ChatEnterName/chatEnterName';

const MainChat = () => {

    const [socket, setSocket] = useState(null);
    const [name, setName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);

    useEffect(() => {
        const socket = io('http://localhost:5000');     // For now this is the testing endpoint, will be updated once pushed to prod
        setSocket(socket);

        socket.on('server-broadcast', (msg) => {
            console.log(`Message reeived from server: ${msg}`);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket && name) {
            socket.userName = name;
            socket.emit('user-name', name);
            setShowNameInput(false);
        }
    }, [name, socket]);

    return (

        <>
            {showNameInput && <ChatEnterName setName={setName} />}
            <ChatHeader />
            <MainChatContainer socket={socket} />
        </>

    );
};

export default MainChat;
