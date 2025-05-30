import { React, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { ref, set, get, child } from "firebase/database";
import { Studentdb } from '../../firebaseStudent';

import { Sun, Moon } from 'lucide-react'
import './nammaCompilerHeader.css';

const NammaCompilerHeader = ({ isDark, setIsDark, shareCode, editorCode, testCode }) => {

    const toggleTheme = () => setIsDark(prev => !prev);

    const handleShareCode = (e) => {
        navigator.clipboard.writeText(shareCode);
        e.target.innerHTML = "✅ Copied!!";
        setTimeout(() => { e.target.innerHTML = "Share Code"; }, 1500);
    }

    const handleCodeSave = async (e) => {
        try {
            e.target.innerHTML = "Saving...";
            //await set(ref(Studentdb, `${testCode}/`), { code: editorCode });
            console.log("Saving code to Firebase:", editorCode);
            const codeArr = editorCode.split('');
            console.log("Code Array:", codeArr);
            console.log("Length:", editorCode.length);
            console.log("Char codes:", [...editorCode].map(c => c.charCodeAt(0)));
            await set(ref(Studentdb, `${testCode}/`), { code: codeArr });
            console.log("Data Written Sucessfully.");
            e.target.innerHTML = "Save";
        } catch (error) {
            console.log("Write Failed: ", error);
        }
    }

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
                    <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerProblemsToogle`}>Problems<span className='nammaCompilerComingSoon'>Coming Soon</span></p>
                    <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerShareCode`} onClick={handleShareCode}>Share Code</p>
                    <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerSave`} onClick={handleCodeSave}>Save</p>
                </div>
            </div >
        </>
    );
};

export default NammaCompilerHeader;
