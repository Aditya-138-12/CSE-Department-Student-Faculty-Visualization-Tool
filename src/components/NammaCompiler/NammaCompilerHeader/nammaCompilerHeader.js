import React from 'react';
import { Sun, Moon } from 'lucide-react'
import './nammaCompilerHeader.css';

const NammaCompilerHeader = ({ isDark, setIsDark }) => {

    const toggleTheme = () => setIsDark(prev => !prev);

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
                    <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerShareCode`}>Share Code<span className='nammaCompilerComingSoon'>Coming Soon</span></p>
                    <p className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerSave`}>Save<span className='nammaCompilerComingSoon'>Coming Soon</span></p>
                </div>
            </div >
        </>
    );
};

export default NammaCompilerHeader;
