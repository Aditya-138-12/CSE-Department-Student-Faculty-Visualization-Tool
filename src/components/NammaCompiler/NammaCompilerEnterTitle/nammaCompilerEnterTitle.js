import React from 'react';
import './nammaCompilerEnterTitle.css';

const NammaCompilerEnterTitle = ({ isDark, setTitle, isViewMode, titleFromDb, title }) => {

    const handleTitleInput = (e) => {
        console.log("Title inputted: ", e.target.value);
        setTitle(e.target.value);
    }
    console.log("(From EnterTitle Component) Title from DB: ", titleFromDb);
    return (
        <>
            <div className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerEnterTitle`}>
                <input readOnly={isViewMode} onChange={handleTitleInput} type='text' placeholder='Enter title' value={titleFromDb ? titleFromDb : title} className={`${isDark ? 'dark-theme' : 'light-theme'} nammaCompilerEnterTitleInput`} />
            </div >
        </>
    );
};

export default NammaCompilerEnterTitle;
