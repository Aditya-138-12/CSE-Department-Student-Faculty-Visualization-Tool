import React from "react";

const NammaCompilerOutput = ({ isDark, outputText = "", compileTimeError = "", defaultText = "(Run the program to see the output)" }) => {
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
                {!outputText && !compileTimeError && defaultText}
                {outputText}
                {compileTimeError}
                {outputText && !compileTimeError && "\n\n[Code Compiled with exit code 0]"}
                {!outputText && compileTimeError && "\n\n[Code Compiled with exit code 1]"}
            </pre>
        </div>
    );
};

export default NammaCompilerOutput;
