import React from 'react';
import './nammaCompilerEnterTitle.css';

const NammaCompilerEnterTitle = ({ isDark }) => {
    return (
        <>
            <div className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerEnterTitle`}>
                <input type='text' placeholder='Enter Title' className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerEnterTitleInput`} />
            </div >
        </>
    );
};

export default NammaCompilerEnterTitle;
