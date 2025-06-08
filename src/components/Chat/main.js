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

    const [uuid, setuuid] = useState('');
    const [showEnterName, setShowEnterName] = useState(false);

    useEffect(() => {

        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        const socket = io('http://localhost:3001', {
            withCredentials: true,
            transports: ['websocket']
        });     // For now this is the testing endpoint, will be updated once pushed to prod `http://localhost:3001`, `https://cse-department-student-faculty.onrender.com`
        setSocket(socket);

        socket.on('server-broadcast', (msg) => {
            console.log(`Message reeived from server: ${msg}`);
        });

        const KEY = '6e6d6a6b-6c6d-4c6b-6f6c-6e6d6a6b6c6d';
        const LocalName = 'LocalName';

        let uid = localStorage.getItem(KEY);
        let localName = localStorage.getItem(LocalName);
        if (uid && localName) {
            setName(localName);
            setuuid(uid);
            socket.emit('user-name', name);
        }

        if (!uid && !localName) {
            setShowEnterName(true);
            uid = crypto.randomUUID();
            localStorage.setItem(KEY, uid);
            setuuid(uid);
        }

        console.log("UID Set to uniquely define: ", uid);

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket && name) {
            socket.userName = name;
            socket.emit('user-name', name);
            setShowNameInput(false);
            localStorage.setItem("LocalName", name);
        }
    }, [name, socket]);

    useEffect(() => {
        if (socket && name && uuid) {
            socket.emit('usr-info', { name: name, uuid: uuid });
            console.log("sent user data via ws.");
        }
    }, [name, uuid, socket]);

    return (

        <>
            {showNameInput && <ChatEnterName showEnterName={showEnterName} setName={setName} />}
            <ChatHeader />
            <MainChatContainer uuid={uuid} socket={socket} />
        </>

    );
};

export default MainChat;
