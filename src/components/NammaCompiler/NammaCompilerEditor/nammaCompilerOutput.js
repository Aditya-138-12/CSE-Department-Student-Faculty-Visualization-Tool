import React from "react";

const NammaCompilerOutput = ({ isDark, outputText = "" }) => {
    return (
        <div className={`nammaCompilerOutputDiv ${isDark ? 'dark-theme' : 'light-theme'}`} style={{ height: '100%', position: 'relative' }}>
            Program Output
            <pre
                style={{
                    fontSize: "0.8rem",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    padding: "1rem",
                    height: "100%",
                    position: "relative",
                }}
                className={`nammaCompilerOutput ${isDark ? 'dark-theme' : 'light-theme'}`}
            >
                {outputText}
            </pre>
        </div>
    );
};

export default NammaCompilerOutput;
