import React, { useState } from 'react';
import './signupform.css';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { Studentauth, Studentdb } from './firebaseStudent'; // Import auth and db from your firebase.js file

const SignUpForm = ({ OnsignupFormbodyDivClick }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        dob: '',
        gender: '',
        usn: '',
        sem: '',
        section: '',
        branch: ''

    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [bsranch, setbsranch] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const createUserWithData = async (email, password, userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(Studentauth, email, password);
            await signOut(Studentauth);
            const user = userCredential.user;
            await updateProfile(user, { displayName: userData.name });

            // Store additional data in Realtime Database
            await set(ref(Studentdb, `StudentUserData/${user.uid}`), {
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile,
                dob: userData.dob,
                gender: userData.gender,
                usn: userData.usn,
                sem: userData.sem,
                section: userData.section,
                branch: bsranch
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
            await signOut(Studentauth);
            setSuccess(`Student created successfully: ${user.displayName}`);
            setFormData({
                name: '',
                email: '',
                password: '',
                mobile: '',
                dob: '',
                gender: '',
                usn: '',
                branch: ''

            });
        } catch (error) {
            setError(`Error creating user: ${error.message}`);
        }
    };

    return (
        <div className='signupFormbodyDiv' onClick={OnsignupFormbodyDivClick}>
            <div className="signup-container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h2>Sign Up</h2>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="usn">USN</label>
                            <input
                                type="text"
                                pattern="1SJ[0-9]{2}CS[0-9]{3}"
                                placeholder='1SJ22CS000'
                                id="usn"
                                value={formData.usn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sem">Sem</label>
                            <input
                                type="Number"
                                placeholder='Sem (1 - 8)'
                                min={1}
                                max={8}
                                id="sem"
                                value={formData.sem}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="section">Section</label>
                            <input
                                type="text"
                                placeholder='Section (A - C)'
                                pattern="[A-Za-z\s]+"
                                id="section"
                                value={formData.section}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="branch">Branch</label>
                            <select
                                id="branch"
                                name="branch"
                                required
                                value={bsranch}
                                onChange={(e) => setbsranch(e.target.value)}
                            >
                                <option value="">Select Branch</option>
                                <option value="CSE">CSE</option>
                            </select>
                        </div>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            pattern="[A-Za-z\s]+"
                            placeholder='Full Name'
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
                            placeholder='Email'
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
                            placeholder='Password (Atleast 6 Characters)'
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
                            placeholder='Mobile Number'
                            max={10}
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
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;