import { React, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Countdown from 'react-countdown';

import { ref, set, get, child, update } from "firebase/database";
import { Studentdb } from '../../firebaseStudent';

import { Snackbar, Alert } from '@mui/joy';

import { Sun, Moon } from 'lucide-react'
import './nammaCompilerHeader.css';
import NammaCompilerCodeSaved from '../NammaCompilerCodeSaved/nammaCompilerCodeSaved';
// import { update } from 'lodash';

const NammaCompilerHeader = ({ expireDateFromDb, stdin, isViewMode, langMainId, isDark, setIsDark, shareCode, editorCode, testCode, refCodeInDb, link, title, lang, langVersion, langSrc }) => {

    const [codeSaved, setCodeSaved] = useState(false);
    const toggleTheme = () => setIsDark(prev => !prev);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleShareCode = (e) => {
        navigator.clipboard.writeText(shareCode);
        e.target.innerHTML = "✅ Copied!!";
        setTimeout(() => { e.target.innerHTML = "Share Code"; }, 1500);
    }

    const [codeSavedClicked, setCodeSavedClicked] = useState(false);

    const handleCodeSave = async (e) => {
        setCodeSavedClicked(true);
        try {
            e.target.innerHTML = "Saving...";
            //await set(ref(Studentdb, `${testCode}/`), { code: editorCode });
            console.log("Saving code to Firebase:", editorCode);
            const codeArr = editorCode.split('');
            console.log("Code Array:", codeArr);
            console.log("Length:", editorCode.length);
            console.log("Char codes:", [...editorCode].map(c => c.charCodeAt(0)));
            await set(ref(Studentdb, `${testCode}/`), { code: codeArr, title: title, lang: lang, langVersion: langVersion, langSrc: langSrc, langId: langMainId, stdin: stdin, expireDate: Date.now() + (1000 * 60 * 60 * 24 * 7) });
            console.log("Data Written Sucessfully.");
            e.target.innerHTML = "Save";
            setCodeSaved(true);
        } catch (error) {
            console.log("Write Failed: ", error);
        }
    }

    const handleRenew = async (e) => {
        console.log("Renew is presed");
        e.target.innerHTML = "Renewing...";
        try {
            await update(ref(Studentdb, `${refCodeInDb}/`), {
                expireDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
            });
            e.target.innerHTML = "Renew";
            console.log("Data Renewed Sucessfully.");
            setSnackbarMessage('Renewed successfully, The code will be deleted within 7 days from now.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.log("Renew Failed: ", error);
            setSnackbarMessage('Renew failed');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    // const targetDate = new Date('2025-06-01T10:00:00');

    return (
        <>
            <div className={`nammaCompilerHeader ${isDark ? ' dark-theme' : 'light-theme'}`} style={{ backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5', color: isDark ? 'white' : 'black' }}>
                <div className='nammaCompilerLogoDiv'>Namma Compiler</div>
                <div className='nammaCompilerOptionDiv'>
                    <p
                        onClick={toggleTheme}
                        className={`nammaCompilerThemeToggle ${isDark ? 'dark-theme' : 'light-theme'}`}
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </p>
                    {!isViewMode && <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerProblemsToogle`}>Problems<span className='nammaCompilerComingSoon'>Coming Soon</span></p>}
                    <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerShareCode`} onClick={handleShareCode}>Share Code</p>
                    {!isViewMode && <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerSave`} onClick={handleCodeSave}>Save</p>}
                    {isViewMode && <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerSave`} onClick={(e) => handleRenew(e)}>Renew</p>}
                    {isViewMode && <Countdown date={expireDateFromDb ? expireDateFromDb : 0} />}
                </div>
            </div >
            {codeSaved && <NammaCompilerCodeSaved link={link} setClose={setCodeSavedClicked} close={codeSavedClicked} />}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NammaCompilerHeader;
