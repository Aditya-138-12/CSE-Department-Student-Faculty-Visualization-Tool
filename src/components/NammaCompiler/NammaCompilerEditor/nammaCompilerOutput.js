import React from "react";

const NammaCompilerOutput = ({ isDark, outputText = "" }) => {
    return (
        <div className={`nammaCompilerOutputDiv ${isDark ? 'dark-theme' : 'light-theme'}`} style={{ height: '100%', position: 'relative', marginTop: '0.5rem' }}>
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
                {outputText ? "\n\n[Code Compiled with exit code 0]" : "(Run the program to see the output)"}
            </pre>
        </div>
    );
};

export default NammaCompilerOutput;
