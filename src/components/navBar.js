import React, { useState, useEffect } from "react";
import "./navBar.css";
import Upload from "./upload.js";
import Login from "./login";
import Analytics from "./analytics";
import { db, auth } from "./firebase";
import { ref as dbRef, onValue } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Oneko from "./oneko";
import Flame from "./flame";
import Flame2 from "./flame2";
import Flame3 from "./flame3"; // Import the Flame component
import FacultyForm from './facultyUploadForm';
import SignUpForm from "./signupform";
import PasswordReset from "./passwordReset";
import UserProfile from "./userProfile";
import FacultyAnalytics from "./facultyAnaytics";


const HoD_UID = process.env.REACT_APP_USER_UID;

const NavBar = () => {
    const [showUpload, setShowUpload] = useState(false);
    const [showUploadButton, setshowUploadButton] = useState(true);
    const [showFacultyUploadButton, setshowFacultyUploadButton] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [UserUid, setUserUid] = useState("");
    const [isFacultyOwner, setisFacultyOwner] = useState(false);
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("student"); // State for active tab
    const [isactiveAdminLogin, setisactiveAdminLogin] = useState(true);
    const [isactiveFacultyLogin, setisactiveFacultyLogin] = useState(false);
    const [showAnalyticsButton, setshowAnalyticsButton] = useState(true);
    const [showFacultyAnalyticsButton, setshowFacultyAnalyticsButton] = useState(false);
    const [ShowFacultyForm, setShowFacultyForm] = useState(false);
    const [ShowFPasswordResetForm, setShowFPasswordResetForm] = useState(false);

    const [showFacultyAnalytics, setShowFacultyAnalytics] = useState(false);

    const eventScores = {
        "Hackathon": 15,
        "Technical Conference": 8,
        "Tech Event": 6,
        "Ideathon": 7,
        "Technical Writings": 9,
        "Published Paper": 12,
        "Makethon": 5,
        "Other": 4
    };

    const getSummary = (score) => {
        if (score >= 50) {
            return "Outstanding Achievement";
        } else if (score >= 45) {
            return "Excellent Performance";
        } else if (score >= 35) {
            return "Very Good";
        } else if (score >= 25) {
            return "Good";
        } else if (score >= 15) {
            return "Fair";
        } else if (score > 5) {
            return "Needs Improvement";
        } else {
            return "No Achievements Yet";
        }
    };

    const UploadBtn = () => {
        setShowUpload(!showUpload);
    };

    const closeUploadDiv = () => {
        setShowUpload(false);
    };

    const makeFacultyTabActive = () => {
        setActiveTab("faculty");
        { isFacultyOwner && setisactiveFacultyLogin(true); }
        changeStateOfFacultyLogin();
        changeStateOfAdminLogin();
        setshowUploadButton(false);
        { !isFacultyOwner && isOwner && setshowAnalyticsButton(false); }       /*Is OWner */
        { !isFacultyOwner && isOwner && setshowFacultyAnalyticsButton(true); }
        { isFacultyOwner && setshowFacultyUploadButton(true); }
        { !isFacultyOwner && isOwner && setisactiveFacultyLogin(false); }
    }

    const changeStateOfAdminLogin = () => {
        setisactiveAdminLogin(false);
    }

    const changeStateOfFacultyLogin = () => {
        setisactiveFacultyLogin(true);
    }

    const makeStudentTabActive = () => {
        setActiveTab("student");
        setisactiveAdminLogin(true);
        setisactiveFacultyLogin(false);
        { !isFacultyOwner && setshowUploadButton(true); }
        { !isFacultyOwner && isOwner && setshowAnalyticsButton(true); }            /*Is Owner */
        setshowFacultyAnalyticsButton(false);
        setshowFacultyUploadButton(false);
    }

    const Loginbtn = () => {
        if (isOwner || isFacultyOwner) {          /*Is Owner */
            handleLogout();
        } else {
            setShowLogin(!showLogin);
        }
    };

    const closeLoginDiv = () => {
        setShowLogin(false);
    };

    const handleLoginToggle = () => {
        if (isOwner || isFacultyOwner) {          /*Is Owner */
            handleLogout();
        } else {
            setShowLogin(true);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsOwner(false);
            setisFacultyOwner(false);
            setUserUid(null);      /*Is Owner */
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const closeFacultyFormDiv = () => {
        setShowFacultyForm(!ShowFacultyForm);
    }

    const closePasswordReseForm = () => {
        setShowFPasswordResetForm(!ShowFPasswordResetForm);
        setShowLogin(!showLogin);

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid);  // Store the logged-in user's UID

                // Check if the logged-in user is the HOD
                if (user.uid === HoD_UID) {
                    setIsOwner(true);           // This user is the HOD
                    setisFacultyOwner(false);   // Clear faculty status for the HOD
                    console.log("HOD logged in");
                } else {
                    setIsOwner(false);          // Ensure HOD status is not active
                    setisFacultyOwner(true);    // This user is a faculty member
                    console.log("Faculty logged in");
                    setshowFacultyUploadButton(true);
                    console.log(user.displayName);
                }
            } else {
                // No user is signed in, reset both HOD and faculty states
                setIsOwner(false);
                setisFacultyOwner(false);
                setUserUid(null);
                console.log("No user logged in");
            }
        });

        return () => unsubscribe();
    }, [auth, HoD_UID]);

    useEffect(() => {
        const fetchData = () => {
            const dataRef = dbRef(db, 'uploads/');
            onValue(dataRef, (snapshot) => {
                const fetchedData = snapshot.val();
                if (fetchedData) {
                    const formattedData = Object.keys(fetchedData).map(key => {
                        const userData = fetchedData[key];
                        let eventCounts = {};
                        let totalScore = 0;

                        if (typeof userData.events === 'object') {
                            eventCounts = Object.values(userData.events).reduce((acc, event) => {
                                const eventType = event.eventName;
                                if (!acc[eventType]) {
                                    acc[eventType] = [];
                                }
                                acc[eventType].push(event.eventURL);

                                if (eventScores[eventType]) {
                                    totalScore += eventScores[eventType];
                                }

                                return acc;
                            }, {});
                        }

                        return {
                            ...userData,
                            usn: key,
                            achievements: Object.entries(eventCounts)
                                .map(([eventName, urls]) => ({
                                    name: eventName,
                                    count: urls.length,
                                    urls: urls
                                })),
                            score: totalScore,
                            summary: getSummary(totalScore)
                        };
                    });

                    formattedData.sort((a, b) => b.score - a.score);
                    setData(formattedData);
                } else {
                    setData([]);
                }
            });
        };

        fetchData();
    }, []);

    return (
        <>
            {false && <SignUpForm />}
            {ShowFPasswordResetForm && <PasswordReset onClose={closePasswordReseForm} />}
            {isFacultyOwner && ShowFacultyForm && <FacultyForm onClose={closeFacultyFormDiv} />}
            {showUpload && <Upload onClose={closeUploadDiv} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={() => setIsOwner(true)} OnPasswordReset={closePasswordReseForm} />}
            {showAnalytics && isOwner && <Analytics onClose={() => setShowAnalytics(false)} data={data} />}
            {showFacultyAnalytics && isOwner && !isFacultyOwner && (
                <FacultyAnalytics onClose={() => setShowFacultyAnalytics(false)} />
            )}

            <div className="mainNavigationDiv">
                <a href="https://aditya-138-12.github.io/CodeArena-Website-/" target="_blank"><div className="leftLogo"></div></a>
                <a href="https://cse.sjcit.ac.in/" target="_blank"><div className="middleLogo"></div ></a>
                {!isFacultyOwner && !isOwner && showUploadButton && <p className="type1" onClick={UploadBtn}>Upload</p>}
                {!isFacultyOwner && showAnalyticsButton && isOwner && <p className="type3" onClick={() => setShowAnalytics(!showAnalytics)}>Student Analytics</p>}
                {!isFacultyOwner && isactiveAdminLogin && <p className="type2" onClick={handleLoginToggle}>{isOwner ? 'HoD CSE Logout' : 'HoD CSE Login'}</p>}
                {activeTab === 'faculty' && isFacultyOwner && showFacultyUploadButton && < p className="type6" onClick={closeFacultyFormDiv}>Upload Faculty</p>}
                {isactiveFacultyLogin && <p className="type4" onClick={handleLoginToggle}>{isFacultyOwner ? "Faculty Logout" : "Faculty Login"}</p>}
                {!isFacultyOwner && isOwner && showFacultyAnalyticsButton && (
                    <p className="type5" onClick={() => setShowFacultyAnalytics(!showFacultyAnalytics)}>
                        Faculty Analytics
                    </p>
                )}
            </div >

            {/* Tab Navigation */}
            < div className="tabNavigation" >
                <div
                    className={isFacultyOwner ? "student123" : "student"}
                    onClick={() => !isFacultyOwner && makeStudentTabActive()}
                >
                    Student
                </div>
                <div
                    className="faculty"
                    onClick={makeFacultyTabActive}
                >
                    Faculty
                </div>
            </div >

            {/* Conditional Rendering Based on Active Tab */}
            {
                activeTab === "student" && (
                    <div className="tableDiv">
                        <table className="table">
                            <thead className="tableHead">
                                <tr>
                                    <th>Rank In College</th>
                                    <th className="name">Name</th>
                                    <th className="usn">USN</th>
                                    <th className="branch">Branch</th>
                                    <th className="section">Section</th>
                                    <th className="sem">Sem</th>
                                    <th className="achievements">Achievements</th>
                                    <th className="summary">Summary</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((entry, index) => (
                                    <tr key={entry.usn}>
                                        <td className={index === 0 ? "first_ranker_row" : index === 1 ? "second_ranker_row" : index === 2 ? "third_ranker_row" : ""}>{index + 1} {index === 0 ? <Flame /> : (index === 1 ? <Flame2 /> : index === 2 ? <Flame3 /> : "")} {/* Show flame for the first ranker */}</td>
                                        <td>{entry.name}</td>
                                        <td>{entry.usn}</td>
                                        <td>{entry.branch}</td>
                                        <td>{entry.section}</td>
                                        <td>{entry.sem}</td>
                                        <td className={index === data.length - 1 ? "last_ranker" : ""}>
                                            {entry.achievements.map((achievement, i) => (
                                                <span key={i} className="achievementTooltip">
                                                    {achievement.name} - {achievement.count}
                                                    <div className="tooltipContent">
                                                        {achievement.urls.map((url, j) => (
                                                            <div key={j}>
                                                                <a href={url} target="_blank" rel="noopener noreferrer">
                                                                    {achievement.name} - {j + 1} Report Link
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {i < entry.achievements.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </td>
                                        <td>{entry.summary || 'N/A'}</td>
                                        <td>{entry.score || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div >
                )
            }

            {
                activeTab === "faculty" && !isOwner && !isFacultyOwner && (
                    <div className="facultyUnderConstruction">
                        <h2>Faculties Are Requested To Kindly Login To Continue.</h2>
                    </div>
                )

            }

            {
                activeTab === "faculty" && isOwner && (
                    <div className="facultyUnderConstruction">
                        <h2>Click on Faculty Analytics To Track The Progress Of The Department.</h2>
                    </div>
                )
            }

            {activeTab === "faculty" && isFacultyOwner && <UserProfile />}

            <div className="bottom-footter">Created with <span>`</span><a className="bottom-footter-heart">♥</a> <span>`</span> By <span>`</span> <a href="https://github.com/Aditya-138-12" target="_blank" className="bottom-footter-aditya-saroha">Aditya Saroha</a></div >
        </>
    );
};

export default NavBar;