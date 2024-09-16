import React, { useState } from 'react';
import './signupform.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase'; // Import auth and db from your firebase.js file

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        dob: '',
        gender: '',
        language: '',
        country: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const createUserWithData = async (email, password, userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: userData.name });

            // Store additional data in Realtime Database
            await set(ref(db, `FacultyUserData/${user.uid}`), {
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile,
                dob: userData.dob,
                gender: userData.gender,
                language: userData.language,
                country: userData.country
            });

            return user;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const user = await createUserWithData(formData.email, formData.password, formData);
            setSuccess(`User created successfully: ${user.displayName}`);
            setFormData({
                name: '',
                email: '',
                password: '',
                mobile: '',
                dob: '',
                gender: '',
                language: '',
                country: ''
            });
        } catch (error) {
            setError(`Error creating user: ${error.message}`);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language</label>
                    <input
                        type="text"
                        id="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;