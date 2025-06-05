import { React, useState, useEffect } from 'react';
import './mainChatContainer.css';
import { Send } from 'lucide-react';
import TypingDots from '../ChatTypingIndicator/typing';

const MainChatContainer = ({ socket }) => {

    const [message, setMessage] = useState('');
    const [msgArray, setMsgArray] = useState([]);
    const [onlineUser, setOnlineUser] = useState([]);

    useEffect(() => {
        if (!socket) return;

        const handleServerMessageBroadcast = (data) => {
            setMsgArray(prev => [...prev, {
                message: data.message,
                userName: data.userName,
                time: "undefined",
                isUser: false
            }]);
            const audio = new Audio("./notif.mp3");
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

        socket.on('server-broadcast', handleServerMessageBroadcast);
        socket.on('online-users', handleOnlineUsers);
        return () => {
            socket.off('server-broadcast', handleServerMessageBroadcast);
        }
    }, [socket]);

    const handleTyping = (e) => {
        if (socket && e.target.value) {
            socket.emit('user-typing', { message: socket.userName, isTyping: true });
        } else {
            socket.emit('user-typing', { message: socket.userName, isTyping: false });
        }
    }

    const handleSubmitMessage = () => {
        if (message) {
            setMsgArray([...msgArray, { message: message, userName: socket.userName, time: new Date().toLocaleTimeString(), isUser: true }]);
            socket.emit('send-message', { message: message, userName: socket.userName });
            setMessage('');
            console.log('submit message');
            socket.emit('user-typing', { message: socket.userName, isTyping: false });  // For letting to know that, after the message has been submitted, the user has stopped typing
        } else {
            console.log('message is empty');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmitMessage();
        }
    };

    return (
        <div className='main-chat-container'>
            <div className='main-chat-messages'>
                <div className='main-chat-container-messages'>

                    {msgArray.map((msgArray, index) => (
                        <div key={index} className='main-chat-main-message-div' style={{ justifyContent: `${msgArray.isUser ? 'right' : 'left'}` }}>
                            <div className='main-chat-main-msg-container'>
                                <div className='main-chat-main-msg-container-header'>
                                    <div className='main-chat-main-msg-container-userDetails'>
                                        <div className='main-chat-main-msg-container-userDetails-avatar'>{msgArray.userName[0].toUpperCase()}</div>
                                        <div className='main-chat-main-msg-container-userDetails-name'>{msgArray.userName}</div>
                                        {/* <div className='main-chat-main-msg-container-userDetails-status'>Online</div> */}
                                    </div>
                                    <div style={{ color: "rgba(0, 0, 0, 0.5)" }} className='main-chat-main-msg-container-time'>{msgArray.time}</div>
                                </div>
                                <div className='main-chat-main-msg-container-message-box'>
                                    <p style={{ margin: "10px", wordBreak: "break-word", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>{msgArray.message}</p>
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