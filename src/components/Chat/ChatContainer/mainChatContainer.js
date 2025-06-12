import { React, useState, useEffect, useRef } from 'react';
import './mainChatContainer.css';
import { Send } from 'lucide-react';
import TypingDots from '../ChatTypingIndicator/typing';
import { last, set } from 'lodash';

const MainChatContainer = ({ socket, uuid, setLoading, setIsLongLoading }) => {

    const [message, setMessage] = useState('');
    const [msgArray, setMsgArray] = useState([]);
    const [onlineUser, setOnlineUser] = useState([]);

    // Added some references to the components to be able to scroll to the latest message.
    const latestMessageRef = useRef(null);
    const containerRef = useRef(null);

    const isUserNearBottom = () => {
        const container = containerRef.current;
        const latestMessage = latestMessageRef.current;
        if (!container || !latestMessage) return false;
        return latestMessage.offsetTop - container.scrollTop < latestMessage.clientHeight;
    };

    // Main useEffect to handle the messages from the server, it works whenever there is a change in the socket, i.e. if server sends a message via the upgraded websocket
    // connection. It receives messages from the server via the `handleServerMessageBroadcast` and adds them to the `msgArray`, which is then used to render the messages.
    useEffect(() => {
        if (!socket) return;

        const handleServerMessageBroadcast = (data) => {
            setMsgArray(prev => [...prev, {
                message: data.message,
                userName: data.userName,
                time: data.time,
                isUser: false
            }]);
            const audio = new Audio(require('./notif.mp3'));
            audio.load();
            audio.play().catch(err => {
                console.warn('Audio play prevented due to an error', err);
            });
            if (Notification.permission === 'granted') {
                new Notification(`New Message arrived from ${data.userName}`, {
                    body: data.message
                });
            }
        };

        const handleOnlineUsers = (data) => {
            console.log('Online Users: ', data);
            setOnlineUser(data);
        };

        const handleInitialChats = (data) => {
            setLoading(false);
            setTimeout(() => {
                setIsLongLoading(true);
            }, 5000);
            const allMsg = [];
            console.log('Initial Chats: ', Object.keys(data));
            Object.entries(data).forEach(([uuid, messageGroup]) => {
                Object.entries(messageGroup).forEach(([msgId, msg]) => {
                    allMsg.push({ ...msg, uuid });
                });
            });
            console.log(allMsg);
            allMsg.sort((a, b) => a.time - b.time);
            const now = Date.now();
            allMsg.forEach(msg => {
                const diff = now - msg.time;

                const seconds = Math.floor(diff / 1000);
                const minutes = Math.floor(diff / (1000 * 60));
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                if (seconds < 60) {
                    msg.time = `just now`;
                } else if (minutes < 60) {
                    msg.time = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else if (hours < 24) {
                    msg.time = `${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else if (days === 1) {
                    msg.time = `yesterday`;
                } else {
                    msg.time = `${days} days ago`;
                }
            });
            setMsgArray(allMsg);
        }

        socket.on('server-broadcast', handleServerMessageBroadcast);
        socket.on('online-users', handleOnlineUsers);
        socket.on('initial-chats', handleInitialChats);
        return () => {
            socket.off('server-broadcast', handleServerMessageBroadcast);
        }
    }, [socket]);

    const [hasTyped, setHasTyped] = useState(false);
    const handleTyping = (e) => {
        if (socket && e.target.value && !hasTyped) {
            socket.emit('user-typing', { message: socket.userName, isTyping: true });
            setHasTyped(true);
        }
        if (socket && e.target.value.length === 0 && hasTyped) {
            socket.emit('user-typing', { message: socket.userName, isTyping: false });
            setHasTyped(false);
        }
    }

    const handleSubmitMessage = () => {
        if (message) {
            setMsgArray([...msgArray, { message: message, userName: socket.userName, time: Date.now(), isUser: true }]);
            socket.emit('send-message', { uuid: uuid, message: message, userName: socket.userName, time: Date.now() });
            setMessage('');
            console.log('submit message');
            socket.emit('user-typing', { message: socket.userName, isTyping: false });  // For letting to know that, after the message has been submitted, the user has stopped typing
        } else {
            console.log('message is empty');
        }
    };

    // This useEffect sets the new messageCame Component to be shown once the new messages arrives and the user has not seen it, otherwise it will just scroll to the newest message.
    useEffect(() => {
        if (isUserNearBottom()) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            setLoading(true);
        }
    }, [msgArray]);

    // use effect to know that the user has finally scrolled to the bottom.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // This handleScroll function will calculate whether the user has came down to the bottom or not.
        const handleScroll = () => {
            const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 50;
            if (atBottom) {
                setLoading(false);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmitMessage();
        }
    };


    return (
        <div className='main-chat-container'>
            <div className='main-chat-messages'>
                <div className='main-chat-container-messages' ref={containerRef} >


                    {msgArray.map((msgArray, index) => (
                        <div key={index} className='main-chat-main-message-div' style={{ justifyContent: `${(msgArray.isUser || msgArray.uuid === uuid) ? 'right' : 'left'}` }}>
                            <div className='main-chat-main-msg-container'>
                                <div className='main-chat-main-msg-container-header'>
                                    <div className='main-chat-main-msg-container-userDetails'>
                                        <div className='main-chat-main-msg-container-userDetails-avatar'>{msgArray.userName[0].toUpperCase()}</div>
                                        <div className='main-chat-main-msg-container-userDetails-name'>{msgArray.userName}</div>
                                        {/* <div className='main-chat-main-msg-container-userDetails-status'>Online</div> */}
                                    </div>
                                    <div style={{ color: "rgba(0, 0, 0, 0.5)" }} className='main-chat-main-msg-container-time'>{msgArray.time}</div>
                                </div>
                                <div className='main-chat-main-msg-container-message-box' ref={latestMessageRef}>
                                    <p style={{ margin: "10px", wordBreak: "break-word", whiteSpace: "pre-wrap", overflowWrap: "break-word", userSelect: "text" }}>{msgArray.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='main-chat-container-options'>
                    <input maxLength={1000} onKeyDown={handleKeyDown} style={{ padding: "15px" }} placeholder='Type your message...' value={message} onInput={(e) => { setMessage(e.target.value); }} onChange={handleTyping}></input>
                    <div onClick={handleSubmitMessage} style={{ position: "relative", padding: '13px', paddingRight: "20px", paddingLeft: "20px", border: "0.1px solid rgba(0, 0, 0, 0.1)", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><Send color='rgba(0, 0, 0, 0.5)' size={20} /></div>

                </div>
            </div>
            <div className='main-chat-sidebar'>
                <p>Online ({onlineUser.length})</p>
                {onlineUser.map((user, index) => (
                    <p key={index}>{user.message}{user.isTyping && <TypingDots />}</p>
                ))}

            </div>
        </div >

    );
};

export default MainChatContainer;