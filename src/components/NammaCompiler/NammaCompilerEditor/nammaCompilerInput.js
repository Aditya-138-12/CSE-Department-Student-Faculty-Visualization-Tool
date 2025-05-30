import React from 'react';

const NammaCompilerInput = ({ isDark, setStdin, stdin, isViewMode, stdinFromDb }) => {

    const handleProgramInput = (event) => {
        console.log("Value of stdin when typing in Input Box: ", event.target.value);
        setStdin(event.target.value);
    }

    return (
        <>
            <div className={`nammaCompilerInputDiv ${isDark ? 'dark-theme' : 'light-theme'}`}>
                <textarea value={isViewMode ? stdinFromDb : stdin} readOnly={isViewMode} type='text' style={{ fontSize: "0.8rem", resize: "none" }} placeholder='Program Input' className={`nammaCompilerInput ${isDark ? 'dark-theme' : 'light-theme'}`} onChange={handleProgramInput} />
            </div >
        </>
    );
};

export default NammaCompilerInput;
