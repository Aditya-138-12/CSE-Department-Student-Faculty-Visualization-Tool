import React from 'react';

const NammaCompilerInput = ({ isDark }) => {
    return (
        <>
            <div className={`nammaCompilerInputDiv ${isDark ? 'dark-theme' : 'light-theme'}`}>
                <textarea type='text' style={{ fontSize: "0.8rem", resize: "none" }} placeholder='Program Input (Under Constrution, will be available soon!!)' className={`nammaCompilerInput ${isDark ? 'dark-theme' : 'light-theme'}`} />
            </div >
        </>
    );
};

export default NammaCompilerInput;
