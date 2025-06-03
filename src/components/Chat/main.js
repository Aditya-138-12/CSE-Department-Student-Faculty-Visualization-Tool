import React, { useEffect } from 'react';
import './main.css';
import { io } from 'socket.io-client';

import ChatHeader from './ChatHeader/chatHeader';
import MainChatContainer from './ChatContainer/mainChatContainer';

const MainChat = () => {

    useEffect(() => {
        const socket = io('http://localhost:5000');     // For now this is the testing endpoint, will be updated once pushed to prod

        return () => {
            socket.disconnect();
        }
    }, []);

    return (

        <>
            <ChatHeader />
            <MainChatContainer />
        </>

    );
};

export default MainChat;
