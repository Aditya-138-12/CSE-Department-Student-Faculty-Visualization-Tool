import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase'; // Import auth from your firebase.js file

const PasswordReset = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess('If Your Account Exist, then a Password reset email is sent to you. Check your inbox.');
            setEmail('');
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    return (
        <div className="reset-container">
            <div className='close-div-reset' onClick={onClose}></div>
            <form onSubmit={handleSubmit} className="reset-form">
                <h2 className='h2-reset'>Reset Password</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <div className="form-group-reset">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="reset-btn">Send Reset Email</button>
            </form>
            <style jsx>{`
                .reset-container {
                    position:absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: auto;
                    background-color: #f0f2f5;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                    z-index:1000;
                }
                .reset-form {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
                    width: 100%;
                    max-width: 400px;
                }
                .h2-reset {
                    text-align: center;
                    color: #333;
                    margin-bottom: 1.5rem;
                }
                .form-group-reset {
                    margin-bottom: 1rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #555;
                }
                input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .reset-btn[type="submit"] {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #4267B2;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .reset-btn:hover {
                    background-color: #365899;
                }
                .error-message {
                    color: #d32f2f;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                .success-message {
                    color: #388e3c;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                .close-div-reset{
                    position:absolute;
                    height:1vw;
                    width:1vw;
                    border-radius:50%;
                    background-color:red;
                    right:4%;
                    top:4%;
                    transition:0.1s ease;
                }
                .close-div-reset:hover{
                    cursor:pointer;
                    transform:scale(1.4);
                    transition:0.1s ease;
                }
            `}</style>
        </div>
    );
};

export default PasswordReset;