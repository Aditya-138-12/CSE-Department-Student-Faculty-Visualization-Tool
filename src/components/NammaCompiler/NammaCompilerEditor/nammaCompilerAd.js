import React from "react";

const NammaCompilerAd = ({ isDark }) => {
    return (
        <div className={`nammaCompilerAdDiv ${isDark ? 'dark-theme' : 'light-theme'}`} style={{ height: 'fit-content', position: 'relative' }}>
            <p className={`nammaCompilerAd ${isDark ? 'dark-theme' : 'light-theme'}`}>Namma Compiler is a free and open source compiler for Namma Programming Language. It is developed by SJCIT CSE CodeArena Club Students.</p>
        </div>
    );
};

export default NammaCompilerAd;
