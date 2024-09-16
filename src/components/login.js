import React, { useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = ({ onClose, onLogin, OnPasswordReset }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            onLogin();
            onClose();
        } catch (error) {
            handleError(); // Display generic error message
        } finally {
            setLoading(false);
        }
    };

    const handleError = () => {
        // Set a generic error message
        setError('Not logged in. Please check your credentials and try again.');
    };

    return (
        <div className="loginMainDiv">
            <div className="closingBtn" onClick={onClose}></div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error-message">{"Error Logging In, Please Try Again."}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p onClick={OnPasswordReset} className="password-reset">Forgot Password, Reset.</p>
            </form>
        </div>
    );
};

export default Login;
