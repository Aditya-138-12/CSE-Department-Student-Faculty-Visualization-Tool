import { React, useState } from 'react';
import './chatEnterName.css';

const ChatEnterName = ({ setName, showEnterName }) => {
    const [inputname, setInputName] = useState('');
    const [error, setError] = useState(0);

    const handleSubmitName = () => {
        if (inputname) {
            console.log('name submitted');
            setError(0);
            setName(inputname);
        } else {
            setError(1);
            setTimeout(() => {
                setError(0);
            }, 1500);
            console.log('name is empty');
        }
    };

    return (

        (showEnterName && < div className='chat-enter-name' >
            <div className='chat-enter-name-inner-div'>
                <input className={error ? 'input-error' : 'chat-enter-name-inner-div-input'} required placeholder={error ? 'Please enter your name' : 'Enter your name'} value={inputname} onInput={(e) => { setInputName(e.target.value); }}></input>
                <div onClick={handleSubmitName} style={{ padding: '15px', border: "0.1px solid rgba(0, 0, 0, 0.1)", userSelect: "none" }}>Submit</div>
                <p style={{ margin: "0px" }}>We store a unique `uuid` in your local storage, so please donot wipe the site data, otherwise you <b>will loose your data</b>, In this case you need to enter your name again.</p>
                <p style={{ color: "rgba(255, 0, 0, 0.5)", margin: "0px" }}>Also please allow the <b>notifications</b> so that you can receive the messages when you are away!</p>
            </div>
        </div >)

    );
};

export default ChatEnterName;
