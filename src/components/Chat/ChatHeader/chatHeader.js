import React from 'react';
import './chatHeader.css';

const ChatHeader = () => {
    return (
        <div className='chat-header'>
            <div className='chat-header-logo'></div>
            <div className='chat-header-option'>
                <div className='chat-header-option-avatar'>A</div>
                <div className='chat-header-option-logout'>Logout</div>
            </div>
        </div>
    );
};

export default ChatHeader;
