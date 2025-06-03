import { React, useState, useEffect } from 'react';
import './mainChatContainer.css';
import { Send } from 'lucide-react';

const MainChatContainer = ({ socket }) => {

    const [message, setMessage] = useState('');
    const [msgArray, setMsgArray] = useState([]);

    useEffect(() => {
        if (!socket) return;

        const handleServerMessageBroadcast = (data) => {
            setMsgArray(prev => [...prev, {
                message: data.message,
                userName: data.userName,
                time: "undefined",
                isUser: false
            }]);
        };
        socket.on('server-broadcast', handleServerMessageBroadcast);
        return () => {
            socket.off('server-broadcast', handleServerMessageBroadcast);
        }
    }, [socket]);

    const handleSubmitMessage = () => {
        if (message) {
            setMsgArray([...msgArray, { message: message, userName: socket.userName, time: new Date().toLocaleTimeString(), isUser: true }]);
            socket.emit('send-message', { message: message, userName: socket.userName });
            setMessage('');
            console.log('submit message');
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
                    <input maxLength={1000} onKeyDown={handleKeyDown} style={{ padding: "15px" }} placeholder='Type your message...' value={message} onInput={(e) => { setMessage(e.target.value); }}></input>
                    <div onClick={handleSubmitMessage} style={{ position: "relative", padding: '13px', paddingRight: "20px", paddingLeft: "20px", border: "0.1px solid rgba(0, 0, 0, 0.1)", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><Send color='rgba(0, 0, 0, 0.5)' size={20} /></div>

                </div>
            </div>
            <div className='main-chat-sidebar'></div>
        </div >

    );
};

export default MainChatContainer;