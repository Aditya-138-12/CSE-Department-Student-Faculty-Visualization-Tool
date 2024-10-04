import React, { useState, useEffect } from 'react';
import { auth, db, storage } from './firebase';  // Import Firebase auth, db, and storage
import { ref as dbRef, get, update, set, onValue } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import './userProfiles.css';
import Snackbar from "@mui/joy/Snackbar";
import { Skeleton } from '@mui/material';

const UserProfile = ({ FacultyUpload, FacultyLogOut }) => {
    const defaultAvatarUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAP1BMVEWoqa3///+lpqqio6f8/Pyoqaukpafu7u/29vbh4eL5+fnx8fKwsbSfoKWmqq3l5ebR0tO7u77DxMba2tzLzM05qcraAAAEFElEQVR4nO2cCZaiMBCGocImBEnA+591Ehm71UZNpRZ65vGd4H9FrUmFojg4ODg4ODg4ODg4OPhfqAN7a/iHAYAmAJG9tfwAzAh+vrgl4Nzsi3H8RSKDxfzSdn1V/qXqu2HxxS8xpLHz6UvaA6fZmr3VFSO4YVPdlWEpxl3lgXWv1a0se1nxHH3v0n3SFxzSFXv44jk6X/tZ3vVD+12MCJc0eRG3Q4Exp3R9ZTk1yp8ZUj/vlZCFOquo8Bz0vckt23SajgiQEL0/zKhoQ7z9rja0WpFiphx9Id0ofWSz5OmLsayhD+ZcfWV50XBDmxEgNzQCZcx0wJVWvLkxnqKvLGfxQMFUkA0GKyuPEiErwnFislL0PZVoqgGiB0ZmSRPSQnilFQwTsD1dYOXlTIhpol/jBAWiuuhXTGL6SFXuDrlUaFn0lWJOyOOCYZaXiuORxQWDE0p1DCOxDt/ogwVFuv+RIQtGYrWTGU+2T9nwhLZVRiCTvhjGEgKBKcuI5ZlDIJlfL5AzikUwXAJl5IVEzdPMXCuJjECGhj8ySNVi8/HOIY2TlAU5ZrqI3FxneaJErqOuWZywFdNXNCxOuAhOdZ5jLpY8WmgYeupBTh5PohEbmVaF9DiWlBe8kGzCk/BJP/Vwofcge51D9cKlEZqXbtSGlmlAaqD7EkgryLPUzH4HZN+EhQjRufDMztaDwnpFTTgIVrkxjtsRMOela5WrxCsm6zrnorgTYDKOMp3qkpSZkX5Yyd8iPin0qJrXz0Z7twe1OTMIXt68pDYuMZirxeyz6mh80hDV7mG+SKj7lxQbOlvvoRCMXxIjuTr58I1jkOgFCjR2QiSaqrXr+pva7pFFtzQnxeUyaFJWQ5/pncracuwVfObiQqcRzjVpsFtiQ3gWFQi0xZlBuiVENwnPVLJN15iUmd8j2HZBwbOzED6ziB9Cw3J+WZWt1OzEdMgf2geJUCGG7yMS8yfP+fSNKSg8szoir771K3MKxG3upzCx5kOuO6Z7+A7761A/uO4573FcNqyB6YbpGb4Okeka9hmuJxw8S3lbTCwC806K0qC7YXzbIuOAKww9diP2gSMTeczLOWjDsFC7Q7ZNj1cQ2wb+EvcMLZLBSxuQuMEAzD3MFi1BINeax3sIcx797UMKXb4BhVPMjfx6wjiFvCP3lY6OB0YyryhGFQ+M9FnlhG8j9DM+Z5FBvoh8k/WmkultRhJ9RtullWNWHL7tAqUcs9LhBSqGSAT9jUeBUf0d6LVRnTL8DbYgNwqN4APVjMs0PLuWGBZkKlToVB9BbrZyvJFE4jH66M+I8aC2avL/VJAP6jEb17MCDBUmE4K+PtQrkz1cEDXdSRxJfwaxfpv7txEaLaKjUW21bqQPd4Dby+Jiu63+AxfOOWntbr/vAAAAAElFTkSuQmCC";

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        mobile: '',
        dob: '',
        gender: '',
        language: '',
        country: '',
        avatar: ''
    });
    const [avatarSrc, setAvatarSrc] = useState(defaultAvatarUrl);
    const [facultyData, setFacultyData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeView, setActiveView] = useState('profile');
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            // Fetch user profile data
            const userRef = dbRef(db, `FacultyUserData/${user.uid}`);
            get(userRef).then((userSnapshot) => {
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.val();
                    setUserInfo({
                        name: userData.name || '',
                        email: user.email || '',
                        mobile: userData.mobile || '',
                        dob: userData.dob || '',
                        gender: userData.gender || '',
                        language: userData.language || '',
                        country: userData.country || '',
                        avatar: userData.avatar || ''
                    });
                    setAvatarSrc(userData.avatar || defaultAvatarUrl);
                } else {
                    console.log('No user data found');
                    setUserInfo(prevState => ({
                        ...prevState,
                        email: user.email || '',
                    }));
                    setAvatarSrc(defaultAvatarUrl);
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                setAvatarSrc(defaultAvatarUrl);

            }).finally(() => {
                setIsLoading(false);

            });

            // Set up real-time listener for faculty data
            const facultyDataRef = dbRef(db, `facultyImpactData/${user.uid}`);
            const unsubscribe = onValue(facultyDataRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setFacultyData(Object.values(data));
                } else {
                    console.log('No faculty data found');
                    setFacultyData([]);
                }
                setIsLoading(false);
            }, (error) => {
                console.error('Error fetching faculty data:', error);
                setIsLoading(false);
            });

            // Clean up the listener when the component unmounts
            return () => unsubscribe();
        } else {
            console.log('No user is logged in.');
            setIsLoading(false);
            setAvatarSrc(defaultAvatarUrl);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async (e) => {
        setIsSaving(true);
        const user = auth.currentUser;
        if (user) {
            try {
                const userRef = dbRef(db, `FacultyUserData/${user.uid}`);
                await update(userRef, userInfo);
                setIsEditing(false);
                console.log('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
            } finally {
                /*setIsSaving(false);*/
                setTimeout(() => {
                    setIsSaving(false);
                }, 2000);
            }
        } else {
            console.log('No user is logged in.');
            setIsSaving(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const user = auth.currentUser;
        if (!user) {
            console.log('No user is logged in.');
            return;
        }

        setIsUploading(true);

        try {
            const fileRef = storageRef(storage, `UserProfilePhotos/${user.uid}/${file.name}`);
            await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(fileRef);

            // Update user info in state and database
            setUserInfo(prevState => ({
                ...prevState,
                avatar: downloadURL
            }));
            setAvatarSrc(downloadURL);

            const userRef = dbRef(db, `FacultyUserData/${user.uid}`);
            await set(userRef, {
                ...userInfo,
                avatar: downloadURL
            });

            console.log('Profile photo updated successfully');
        } catch (error) {
            console.error('Error uploading photo:', error);
            setAvatarSrc(defaultAvatarUrl);
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageError = () => {
        setAvatarSrc(defaultAvatarUrl);
    };

    const renderProfileView = () => (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            {isSaving ? (
                <>
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '35px' }} />
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '35px' }} />
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '35px' }} />
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '10px' }} />
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '35px' }} />
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '10px' }} />
                    <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '10px' }} />
                </>
            ) : (
                <>
                    <div className="form-group">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            className="input"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Email</label>
                        <input type="email" value={userInfo.email} className="input" disabled />
                    </div>
                    <div className="form-group">
                        <label className="label">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={userInfo.mobile}
                            onChange={handleInputChange}
                            className="input"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={userInfo.dob}
                            onChange={handleInputChange}
                            className="input"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Gender</label>
                        <select
                            name="gender"
                            value={userInfo.gender}
                            onChange={handleInputChange}
                            className="select"
                            disabled={!isEditing}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Language</label>
                        <input
                            type="text"
                            name="language"
                            value={userInfo.language}
                            onChange={handleInputChange}
                            className="input"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={userInfo.country}
                            onChange={handleInputChange}
                            className="input"
                            disabled={!isEditing}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        {isEditing ? (
                            <button type="button" className="button" onClick={handleSaveClick} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Profile'}
                            </button>
                        ) : (
                            <button type="button" className="button" onClick={handleEditClick}>Edit Profile</button>
                        )}
                    </div>
                </>
            )}
        </form>
    );

    const renderDashboardView = () => (
        <div className="dashboard">
            <h2 className="dashboard-title">Faculty Dashboard Contents</h2>
            {facultyData.length > 0 ? (
                <div className="faculty-data-grid">
                    {facultyData.map((item) => (
                        <div key={item.id} className="faculty-data-card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    {item.type === 'achievement' ? 'Achievement' : 'Event'}
                                </h3>
                                <span className="card-date">
                                    {item.date}
                                    {item.startDate && ` - ${item.endDate}`}
                                </span>
                            </div>
                            <div className="card-content">
                                {item.type === 'achievement' && (
                                    <>
                                        <p className="achievement-type">{item.achievement}</p>
                                        {item.achievement === 'published-paper' && (
                                            <>
                                                <p><strong>Paper Title:</strong> {item['paper-title']}</p>
                                                <p><strong>Journal:</strong> {item['journal-name']}</p>
                                                <p><strong>Author's:</strong> {item['author-name']}</p>
                                                <p><strong>ISSN Number:</strong> {item['issn-number']}</p>
                                                <p><strong>Link:</strong><a href={item['link']} target='_blank'>Click Here</a></p>
                                            </>
                                        )}
                                        {item.achievement === 'awarded-fellowship' && (
                                            <>
                                                <p><strong>Fellowship:</strong> {item['fellowship-title']}</p>
                                                <p><strong>Grant Amount:</strong> Rs.{item['grant-amount']}</p>
                                            </>
                                        )}
                                        {item.achievement === 'completed-project' && (
                                            <>
                                                <p><strong>Project:</strong> {item['project-title']}</p>
                                                <p><strong>Funding Agency:</strong> {item['funding-agency']}</p>
                                            </>
                                        )}
                                    </>
                                )}
                                {item.type === 'event' && (
                                    <>
                                        <p className="event-type">{item.events}</p>
                                        {item.events === 'conference' && (
                                            <>
                                                <p><strong>Conference:</strong> {item['conference-name']}</p>
                                                <p><strong>Presentation:</strong> {item['presentation-topic']}</p>
                                            </>
                                        )}
                                        {item.events === 'workshop' && (
                                            <>
                                                <p><strong>Workshop:</strong> {item['workshop-name']}</p>
                                                <p><strong>Skills Learned:</strong> {item['skills-learned']}</p>
                                            </>
                                        )}
                                        {item.events === 'seminar' && (
                                            <p><strong>Seminar Topic:</strong> {item['seminar-topic']}</p>
                                        )}
                                        {item.events === 'College Event ' && (
                                            <>
                                                <p><strong>Name Of the Event:</strong> {item['event-name']}</p>
                                                <p><strong>Name of the Resource Person's:</strong> {item['person-name']}</p>
                                                <p><strong>Event Conducted For:</strong> {item['event-conducted-for']}</p>
                                                <p><strong>Place of Conduction:</strong> {item['place-conduction']}</p>
                                                <p><strong>Event Poster Link:</strong> <a href={item['event-poster-link']} target='_blank'>Click Here</a></p>
                                                <p><strong>Event Report Link:</strong> <a href={item['event-report-link']} target='_blank'>Click Here</a></p>
                                            </>
                                        )}
                                    </>
                                )}
                                <p className="card-department"><strong>Department:</strong> {item.dept}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-data-message">No Faculty data uploaded yet.</p>
            )}
        </div>
    );

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="sidebar">
                    <div className="photo-upload">
                        {isUploading ? (
                            <Skeleton className='skeleton-avatar' variant="circular" width={250} height={250} />
                        ) : (
                            <img
                                src={avatarSrc}
                                alt="User"
                                className="avatar"
                                onError={handleImageError}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            id="photo-upload"
                            style={{ display: 'none' }}
                            disabled={isUploading}
                        />
                        <label htmlFor="photo-upload" className={`button upload-button ${isUploading ? 'uploading' : ''}`}>
                            {isUploading ? 'Uploading...' : 'Change Photo'}
                        </label>
                    </div>
                    <nav>
                        <div
                            className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveView('profile')}
                        >
                            Faculty Info
                        </div>
                        <div
                            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveView('dashboard')}
                        >
                            Faculty Dashboard
                        </div>
                        <div
                            className={'nav-item'}
                            onClick={FacultyUpload}
                        >
                            Faculty Upload
                        </div>
                        <div
                            className={'nav-itemLogOut'}
                            onClick={FacultyLogOut}
                        >
                            Log Out
                        </div>
                    </nav>
                </div>
                <div className="main-content">
                    <header className="header">
                        {activeView === 'profile' ? 'Faculty Info' : 'Faculty Dashboard'}
                    </header>
                    {activeView === 'profile' ? renderProfileView() : renderDashboardView()}
                </div>
            </div>
        </>
    );
};

export default UserProfile;