import React, { useState, useEffect } from "react";
import "./navBar.css";
import Upload from "./upload.js";
import Login from "./login";
import Analytics from "./analytics";
import { db, auth, storage } from "./firebase";
import { Studentauth, Studentdb, Studentstorage } from "./firebaseStudent";
import { ref as dbRef, get, update, getDatabase } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
/*import { getStorage, ref as storageRef, listAll, getMetadata, getDownloadURL } from 'firebase/storage';*/
// Import the Flame, Oneko component
import FacultyForm from './facultyUploadForm';
import SignUpForm from "./signupform";
import PasswordReset from "./passwordReset";
import UserProfile from "./userProfile";
import FacultyAnalytics from "./facultyAnaytics";
import MUITable from "./muitable";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sheet from '@mui/joy/Sheet';
import Snackbar from "@mui/joy/Snackbar";
import { SideBar } from "./sideBar/sideBar";
/*import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";*/
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { StudentLoginForm } from './studentLogin.js';
import Avatar from '@mui/joy/Avatar';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { Skeleton } from "@mui/material";
import { Skeleton as CSkeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { HoDSideBar } from "./HoDSideBar/HoDSideBar";
import FacultyReportGenerator from "./FacultyReportGenerator";
import CountUp from 'react-countup';
import { ChartExample } from "./chartExample";
import { LiveDataChart } from "./LiveChartExample";


const HoD_UID = process.env.REACT_APP_USER_UID;

const theme = createTheme();

const NavBar = () => {
    const [loadingState, setLoadingState] = useState(true);
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
    const [isactiveAdminLogin, setisactiveAdminLogin] = useState(false);
    const [isactiveFacultyLogin, setisactiveFacultyLogin] = useState(false);
    const [showAnalyticsButton, setshowAnalyticsButton] = useState(true);
    const [showFacultyAnalyticsButton, setshowFacultyAnalyticsButton] = useState(false);
    const [ShowFacultyForm, setShowFacultyForm] = useState(false);
    const [ShowFPasswordResetForm, setShowFPasswordResetForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [showFacultyAnalytics, setShowFacultyAnalytics] = useState(false);
    const [SecondOpen, setSecondOpen] = useState(false);
    const [Modalopen, setModalopen] = useState(false);

    const [isStudentOwner, setisStudentOwner] = useState(false);
    const [StudentShowLogin, setStudentShowLogin] = useState(false);
    const [StudentUserUid, setStudentUserUid] = useState(null);

    const [isSaving, setisSaving] = useState(false);
    const [isEditing, setisEditing] = useState(false);

    const [ShowReportGenerator, setShowReportGenerator] = useState(false);

    const [totalSize, setTotalSize] = useState(0);
    const [debugInfo, setDebugInfo] = useState('');

    const [HoDModalopen, setHoDModalopen] = useState(false);

    const [showStudentSignUpFormButton, setshowStudentSignUpFormButton] = useState(true);
    const [showStudentSignUpForm, setshowStudentSignUpForm] = useState(false);

    const [StudentuserInfo, setStudentuserInfo] = useState({
        name: "",
        usn: "",
        sem: "",
        branch: "",
        section: "",
        email: "",
        gender: "",
        mobile: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setStudentuserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleEditClick = () => {
        setisEditing(true);
    }

    const handleSaveClick = async () => {
        setisSaving(true);
        console.log("Inside the handleSaveClick");
        const user = Studentauth.currentUser;
        console.log(user);
        if (user) {
            try {
                const userRef = dbRef(Studentdb, `StudentUserData/${user.uid}`);
                await update(userRef, StudentuserInfo);
                setisEditing(false);
                console.log('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
            } finally {
                /*setIsSaving(false);*/
                setTimeout(() => {
                    setisSaving(false);
                }, 2000);
            }
        } else {
            console.log('No user is logged in.');
            setisSaving(false);
        }
    }

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
        setisactiveAdminLogin(false);
        setisactiveFacultyLogin(false);
        { !isFacultyOwner && setshowUploadButton(true); }
        { !isFacultyOwner && isOwner && setshowAnalyticsButton(true); }            /*Is Owner */
        setshowFacultyAnalyticsButton(false);
        setshowFacultyUploadButton(false);
        setshowStudentSignUpFormButton(true);
    }

    const makeHoDTabActive = () => {
        setActiveTab("HoD");
        setisactiveAdminLogin(true);
        setshowStudentSignUpFormButton(false);
        setshowUploadButton(false);
    }

    const StudentLoginbtn = () => {
        if (isStudentOwner) {          /*Is Owner */
            handleLogout();
        } else {
            setStudentShowLogin(!StudentShowLogin);
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
        } finally {
            console.log("In finally block");
            setOpen(true);
        }
    };

    const handleStudentLogout = async () => {
        try {
            await signOut(Studentauth);
            setisStudentOwner(false);
            setStudentUserUid(null);      /*Is Owner */
        } catch (error) {
            console.error("Error signing out: ", error);
        } finally {
            console.log("In finally block");
            setOpen(true);
        }
    };

    const closeFacultyFormDiv = () => {
        setShowFacultyForm(!ShowFacultyForm);
    }

    const closePasswordReseForm = () => {
        setShowFPasswordResetForm(!ShowFPasswordResetForm);
        setShowLogin(!showLogin);

    }




    /*
    useEffect(() => {
        const fetchTotalSize = async () => {
            let totalBytes = 0;
            let debugLog = '';

            // Fetch Realtime Database size
            try {
                const dbSnapshot = await get(dbRef(Studentdb, 'uploads'));
                const dbData = JSON.stringify(dbSnapshot.val());
                const dbSize = new TextEncoder().encode(dbData).length;
                totalBytes += dbSize;
                debugLog += `Database size: ${dbSize} bytes\n`;
            } catch (error) {
                debugLog += `Error fetching database size: ${error.message}\n`;
            }

            // Fetch Storage size
            try {
                const rootRef = storageRef(Studentstorage, 'files');
                const allFiles = await listAllFiles(rootRef);
                debugLog += `Found ${allFiles.length} files in storage\n`;

                for (const file of allFiles) {
                    try {
                        const url = await getDownloadURL(file);
                        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
                        const size = parseInt(response.headers.get('Content-Length') || '0', 10);
                        totalBytes += size;
                        debugLog += `File ${file.fullPath}: ${size} bytes\n`;
                    } catch (itemError) {
                        debugLog += `Error fetching size for ${file.fullPath}: ${itemError.message}\n`;
                    }
                }
            } catch (error) {
                debugLog += `Error fetching storage list: ${error.message}\n`;
            }

            // Convert to MB and update state
            const totalMB = totalBytes / (1024 * 1024);
            debugLog += `Total Size: ${totalMB.toFixed(2)} MB (${totalBytes} bytes)\n`;
            console.log(debugLog);
            setDebugInfo(debugLog);
            setTotalSize(parseFloat(totalMB.toFixed(2)));
        };

        const listAllFiles = async (ref) => {
            const allFiles = [];
            // List all files in the current directory
            const listResult = await listAll(ref);

            // Add all files to our result
            allFiles.push(...listResult.items);

            // Recursively list files in all subdirectories
            for (const subDir of listResult.prefixes) {
                const subDirFiles = await listAllFiles(subDir);
                allFiles.push(...subDirFiles);
            }

            return allFiles;
        };

        fetchTotalSize();
    }, []);
    */






    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setSecondOpen(true);
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
        const unsubscribe = onAuthStateChanged(Studentauth, (user) => {
            if (user) {
                setisStudentOwner(true);
                setStudentUserUid(user.uid);
                console.log("Student logged in");

                const LoggedInUSerDataInfoCall = dbRef(Studentdb, 'StudentUserData/' + user.uid);

                get(LoggedInUSerDataInfoCall).then((snapshot) => {
                    if (snapshot.exists()) {
                        const LoggedInUserData = snapshot.val();

                        setStudentuserInfo({
                            name: LoggedInUserData['name'] || '',
                            email: LoggedInUserData['email'] || '',
                            mobile: LoggedInUserData['mobile'] || '',
                            usn: LoggedInUserData['usn'] || '',
                            gender: LoggedInUserData['gender'] || '',
                            branch: LoggedInUserData['branch'] || '',
                            sem: LoggedInUserData['sem'] || '',
                            section: LoggedInUserData['section'] || ''
                        });

                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                });

                // Add any student-specific state updates here
            } else {
                setisStudentOwner(false);
                setStudentUserUid(null);
                setStudentuserInfo({
                    name: "",
                    usn: "",
                    sem: "",
                    branch: "",
                    section: "",
                    email: "",
                    gender: "",
                    mobile: "",
                });
            }
        });

        return () => unsubscribe();
    }, [Studentauth]);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingState(true);
            const eventsRef = dbRef(Studentdb, 'uploads/');
            const userDataRef = dbRef(Studentdb, 'StudentUserData/');

            try {
                const [eventsSnapshot, userDataSnapshot] = await Promise.all([
                    get(eventsRef),
                    get(userDataRef)
                ]);

                const eventsData = eventsSnapshot.val();
                const userData = userDataSnapshot.val();

                console.log("UserData");

                /*console.log(userData[StudentUserUid]);*/

                console.log("EventsData" + eventsData);

                if (eventsData && userData) {
                    const formattedData = Object.keys(eventsData).map(uid => {
                        const userEvents = eventsData[uid].events || {};
                        const userInfo = userData[uid] || {};

                        let eventCounts = {};
                        let totalScore = 0;

                        Object.values(userEvents).forEach(event => {
                            const eventType = event.eventName;
                            if (!eventCounts[eventType]) {
                                eventCounts[eventType] = [];
                            }
                            eventCounts[eventType].push(event.reportURL);

                            if (eventScores[eventType]) {
                                totalScore += eventScores[eventType];
                            }
                        });

                        return {
                            ...userInfo,
                            usn: userInfo.usn,
                            achievements: Object.entries(eventCounts).map(([eventName, urls]) => ({
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
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            }

            setLoadingState(false);
        };

        fetchData();
    }, []);

    return (

        <>

            {ShowReportGenerator && isOwner && !isStudentOwner && !isFacultyOwner && <FacultyReportGenerator onClickonReportGeneratorCloseButton={() => setShowReportGenerator(false)} />}

            {isStudentOwner && !isFacultyOwner && !isOwner && showUploadButton && isStudentOwner && < SideBar onClickonUploadButton={UploadBtn} onClickLogOutButton={handleStudentLogout} />}

            <Snackbar
                autoHideDuration={4000}
                open={open}
                size="lg"
                variant={'solid'}
                color={'primary'}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpen(false);
                }}
            >
                Logged Out Sucessfully
            </Snackbar>

            <Snackbar
                autoHideDuration={4000}
                open={SecondOpen}
                size="lg"
                variant={'solid'}
                color={'primary'}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setSecondOpen(false);
                }}
            >
                Logged In Sucessfully
            </Snackbar>

            <ThemeProvider theme={theme}>
                {showStudentSignUpForm && <SignUpForm OnsignupFormbodyDivClick={() => setshowStudentSignUpForm(false)} />}
                {ShowFPasswordResetForm && <PasswordReset onClose={closePasswordReseForm} />}
                {isFacultyOwner && ShowFacultyForm && <FacultyForm onClose={closeFacultyFormDiv} />}
                {showUpload && <Upload onClose={closeUploadDiv} studentUid={StudentUserUid} />}
                {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={() => setIsOwner(true)} OnPasswordReset={closePasswordReseForm} />}
                {StudentShowLogin && <StudentLoginForm onStudentClose={() => setStudentShowLogin(false)} onStudentLogin={() => setisStudentOwner(true)} OnStudentPasswordReset={closePasswordReseForm} />}
                {showAnalytics && isOwner && !isFacultyOwner && !isStudentOwner && <Analytics onClose={() => setShowAnalytics(false)} data={data} />}
                {showFacultyAnalytics && isOwner && !isFacultyOwner && !isStudentOwner && (
                    <FacultyAnalytics onClose={() => setShowFacultyAnalytics(false)} />
                )}
                <div>
                    <div className="mainNavigationDiv">
                        <a href="https://aditya-138-12.github.io/CodeArena-Website-/" target="_blank"><div className="leftLogo"></div></a>
                        <a href="https://cse.sjcit.ac.in/" target="_blank"><div className="middleLogo"></div ></a>
                        {/* !isFacultyOwner && !isOwner && showUploadButton && <p className="type1" onClick={UploadBtn}>Student Upload</p> */}
                        {/* !isFacultyOwner && showAnalyticsButton && isOwner && <p className="type3" onClick={() => setShowAnalytics(!showAnalytics)}>Student Analytics</p>*/}
                        {/* !isFacultyOwner && isactiveAdminLogin && !isOwner && <p className="type2" onClick={handleLoginToggle}>{isOwner ? '' : 'HoD CSE Login'}</p> */}

                        {/* activeTab === 'faculty' && isFacultyOwner && showFacultyUploadButton && < p className="type6" onClick={closeFacultyFormDiv}>Upload Faculty</p> */}

                        {/* isactiveFacultyLogin && <p className="type4" onClick={handleLoginToggle}>{isFacultyOwner ? "Faculty Logout" : ""}</p> */}

                        {!isFacultyOwner && isOwner && showFacultyAnalyticsButton && (
                            <p className="type5" onClick={() => setShowFacultyAnalytics(!showFacultyAnalytics)}>
                                Faculty Analytics
                            </p>
                        )}



                        <div className="StudentAuthButton">
                            <CssVarsProvider>
                                {!isStudentOwner && !isFacultyOwner && !isOwner && showUploadButton && <Button onClick={() => { StudentLoginbtn(); }} className="bt" size="sm" >Student Login</Button>}
                            </CssVarsProvider>

                            <CssVarsProvider>
                                {showStudentSignUpFormButton && !isStudentOwner && !isFacultyOwner && !isOwner && showUploadButton && <Button onClick={() => { setshowStudentSignUpForm(!showStudentSignUpForm) }} className="sgnbt" size="sm" >Student Signup</Button>}
                            </CssVarsProvider>
                        </div>

                        <CssVarsProvider>
                            {isStudentOwner && <Avatar onClick={() => setModalopen(!Modalopen)} className="userAvatar" variant="soft" size="lg" alt={StudentuserInfo.name} />}
                        </CssVarsProvider>

                        <CssVarsProvider>
                            {isOwner && !isStudentOwner && !isFacultyOwner && <Avatar onClick={() => setHoDModalopen(!Modalopen)} className="userAvatar" variant="soft" size="lg" src="https://cse.sjcit.ac.in/wp-content/uploads/2022/02/cse-hod-948x1024.jpg" alt="ManjuNath Kumar B.H." />}
                        </CssVarsProvider>

                        <CssVarsProvider>
                            <Modal
                                className="userAvatarInfoModal"
                                aria-labelledby="modal-title"
                                aria-describedby="modal-desc"
                                open={Modalopen}
                                onClose={() => setModalopen(false)}
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Sheet
                                    variant="outlined"
                                    sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                                >
                                    <ModalClose variant="plain" sx={{ m: 1 }} />
                                    <Typography
                                        component="h2"
                                        id="modal-title"
                                        level="h4"
                                        textColor="inherit"
                                        sx={{ fontWeight: 'lg', mb: 1 }}
                                    >
                                        Student Profile
                                    </Typography>










                                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                                        {isSaving ? (
                                            <>
                                                <div className={'cs'}></div>
                                                <div className={'cs'}></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="form-group">
                                                    <label className="label">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={StudentuserInfo.name}
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Email</label>
                                                    <input type="email" value={StudentuserInfo.email} className="input" disabled />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Mobile</label>
                                                    <input
                                                        type="tel"
                                                        name="mobile"
                                                        value={StudentuserInfo.mobile}
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">USN</label>
                                                    <input
                                                        type="text"
                                                        name="usn"
                                                        value={StudentuserInfo.usn}
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Gender</label>
                                                    <select
                                                        name="gender"
                                                        value={StudentuserInfo.gender}
                                                        onChange={handleInputChange}
                                                        className="select"
                                                        disabled={!isEditing}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Branch</label>
                                                    <input
                                                        type="text"
                                                        name="branch"
                                                        value={StudentuserInfo.branch}
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Semester</label>
                                                    <input
                                                        type="text"
                                                        name="sem"
                                                        value={StudentuserInfo.sem}
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="label">Section</label>
                                                    <input
                                                        type="text"
                                                        name="section"
                                                        value={StudentuserInfo.section}
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>


                                                {isEditing ? (
                                                    <div className="StudentProfileSavebutton" onClick={handleSaveClick} disabled={isSaving}>
                                                        {isSaving ? 'Saving...' : 'Save Profile'}
                                                    </div>
                                                ) : (
                                                    <div className="StudentProfileEditbutton" onClick={handleEditClick}>Edit Profile</div>
                                                )}


                                            </>
                                        )}
                                    </form>






                                </Sheet>
                            </Modal>
                        </CssVarsProvider>















































                        <CssVarsProvider>
                            <Modal
                                className="userAvatarInfoModal"
                                aria-labelledby="modal-title"
                                aria-describedby="modal-desc"
                                open={HoDModalopen}
                                onClose={() => setHoDModalopen(false)}
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Sheet
                                    variant="outlined"
                                    sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                                >
                                    <ModalClose variant="plain" sx={{ m: 1 }} />
                                    <Typography
                                        component="h2"
                                        id="modal-title"
                                        level="h4"
                                        textColor="inherit"
                                        sx={{ fontWeight: 'lg', mb: 1 }}
                                    >
                                        Head Of The Department Computer Science & Engineering Profile
                                    </Typography>










                                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                                        {isSaving ? (
                                            <>
                                                <div className={'cs'}></div>
                                                <div className={'cs'}></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                                <div className={'cs'} ></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="form-group">
                                                    <label className="label">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value="Dr. Manjunath Kumar B.H"
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Email</label>
                                                    <input type="email" value="manjunathabh@sjcit.ac.in" className="input" disabled />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Mobile</label>
                                                    <input
                                                        type="tel"
                                                        name="mobile"
                                                        value="9900600756"
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Employee Id</label>
                                                    <input
                                                        type="text"
                                                        name="usn"
                                                        value=""
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Gender</label>
                                                    <select
                                                        name="gender"
                                                        value="male"
                                                        onChange={handleInputChange}
                                                        className="select"
                                                        disabled={!isEditing}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Branch</label>
                                                    <input
                                                        type="text"
                                                        name="branch"
                                                        value="CSE HoD"
                                                        onChange={handleInputChange}
                                                        className="input"
                                                        disabled={!isEditing}
                                                    />
                                                </div>


                                                {isEditing ? (
                                                    <div className="StudentProfileSavebutton" onClick={handleSaveClick} disabled={isSaving}>
                                                        {isSaving ? 'Saving...' : 'Save Profile'}
                                                    </div>
                                                ) : (
                                                    <div className="StudentProfileEditbutton" onClick={handleEditClick}>Edit Profile</div>
                                                )}


                                            </>
                                        )}
                                    </form>






                                </Sheet>
                            </Modal>
                        </CssVarsProvider>

                    </div >

                    {/* Tab Navigation */}
                    < div className="tabNavigation" >
                        <div
                            className={(isFacultyOwner) ? "student123" : "student"}
                            onClick={() => !isFacultyOwner && makeStudentTabActive()}
                        >
                            CSE Students
                        </div>
                        <div
                            className={(isStudentOwner || isOwner) ? "faculty123" : "faculty"}
                            onClick={() => !isOwner && !isStudentOwner && makeFacultyTabActive()}
                        >
                            CSE Faculty
                        </div>
                        <div
                            className={(isStudentOwner || isFacultyOwner) ? "HoD123" : "HoD"}
                            onClick={() => !isFacultyOwner && !isStudentOwner && makeHoDTabActive()}
                        >
                            CSE HoD
                        </div>
                    </div >
                </div>
                {/* Conditional Rendering Based on Active Tab */}
                {
                    activeTab === "student" && (
                        <div className="tableDiv">
                            {/*
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
                                            <td className={index === 0 ? "first_ranker_row" : index === 1 ? "second_ranker_row" : index === 2 ? "third_ranker_row" : ""}>{index + 1} {index === 0 ? <Flame /> : (index === 1 ? <Flame2 /> : index === 2 ? <Flame3 /> : "")} </td>
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
                                        </tr >
                                    ))}
                                </tbody >
                            </table >
                        */}

                            <MUITable data={data || []} isLoading={loadingState} isHoDLoggedIn={isOwner} />


                        </div >
                    )
                }

                {
                    activeTab === "faculty" && !isOwner && !isFacultyOwner && (
                        <div className="facultyUnderConstruction">
                            <h2>Faculties Are Requested To Kindly Login , To Continue.</h2>
                            {isactiveFacultyLogin && <p className="ttrr" onClick={handleLoginToggle}>{isFacultyOwner ? "" : "Faculty Login"}</p>}
                        </div>
                    )

                }

                {
                    activeTab === "faculty" && isOwner && !isFacultyOwner && (
                        <div className="facultyUnderConstruction">
                            <h2>Click on Faculty Analytics To Track The Progress Of The Department.</h2>
                        </div>
                    )
                }

                {
                    activeTab === "HoD" && !isOwner && !isFacultyOwner && (
                        <div className="facultyUnderConstruction">
                            <h2>HoD CSE is Requested To Kindly Login , To Continue.</h2>
                            {isactiveAdminLogin && <p className="ttrr" onClick={handleLoginToggle}>{isOwner ? "" : "HoD CSE Login"}</p>}
                        </div>
                    )
                }

                {activeTab === "faculty" && isFacultyOwner && <UserProfile FacultyUpload={closeFacultyFormDiv} FacultyLogOut={handleLoginToggle} />}

                {activeTab === "HoD" && isOwner &&
                    <>
                        <p className="HoDLoggedIn">HoD Sir Logged In</p>

                        <div className="HoDManyUtilities">

                            <div className="NumberOfStudentsEnrolled">
                                <CountUp className="CountUp" end={data.length} />
                                <p className="CountUp_p">+</p>
                                <p className="CountUp_p_students">Students on SJCIT-Connect</p>
                            </div>

                            <div className="NumberOfFacultyEnrolled">
                                <CountUp className="CountUp" end={30} />
                                <p className="CountUp_p">+</p>
                                <p className="CountUp_p_faculty">Faculty on SJCIT-Connect</p>
                            </div>

                            <div className="NumberOfFacultyEnrolled">
                                <CountUp className="CountUp" end={0} />
                                <p className="CountUp_p">+</p>
                                <p className="CountUp_p_reportsGenerated">Total Reports Generated</p>
                            </div>

                            <div className="NumberOfFacultyEnrolled">
                                <CountUp className="CountUp" end={20} /> {/**end={totalSize}*/}
                                <p className="CountUp_p"> +Gb </p>
                                <p className="CountUp_p_reportsGenerated">Total Data Capacity</p>
                            </div>
                        </div>

                        <HoDSideBar onClickLogOutButton={handleLogout} onClickonStudentAnalyticsButton={() => { setShowAnalytics(true) }}
                            onClickonFacultyAnalyticsButton={() => { setShowFacultyAnalytics(true) }}
                            onClickonReportGeneratorButton={() => { setShowReportGenerator(true) }}
                        />

                        <div className="ChartsHoDdashboardDiv">
                            <ChartExample />

                            <LiveDataChart />
                        </div>

                    </>
                }

                {false && <div className="bottom-footter">Created with <span>`</span><a className="bottom-footter-heart">♥</a> <span>`</span> By <span>`</span> <a href="https://github.com/Aditya-138-12" target="_blank" className="bottom-footter-aditya-saroha">Aditya Saroha</a></div >}
            </ThemeProvider >
        </>
    );
};

export default NavBar;