import { React, useState } from 'react';
import './main.css';
import NammaCompilerHeader from './NammaCompilerHeader/nammaCompilerHeader';
import NammaCompilerEnterTitle from './NammaCompilerEnterTitle/nammaCompilerEnterTitle';
import NammaCompilerMenuBar from './NammaCompilerMenuBar/nammaCompilerMenuBar';
import NammaCompilerEditor from './NammaCompilerEditor/nammaCompilerEditor';
import NammaCompilerInput from './NammaCompilerEditor/nammaCompilerInput';
import NammaCompilerOutput from './NammaCompilerEditor/nammaCompilerOutput';
import NammaCompilerAd from './NammaCompilerEditor/nammaCompilerAd';

const NammaCompilerMain = () => {

    const [isDark, setIsDark] = useState(false);
    const [editorCode, setEditorCode] = useState(`#include <iostream>
int main(){
  std::cout << "Still under Construction, users may face performance issues";
  std::cout << "Welcome to Namma Compiler! Made by SJCIT CSE CodeArena Club Students";
  return 0;
}`);
    
    const [stdin, setStdin] = useState('');

    const [output, setOutput] = useState("");

    return (
        <>
            <div className={`nammaCompiler ${isDark ? 'dark-theme' : 'light-theme'}`}>
                <NammaCompilerHeader isDark={isDark} setIsDark={setIsDark} />
            </div>
            <div className={`nammaCompiler2 ${isDark ? 'dark-theme' : 'light-theme'}`} >
                <NammaCompilerEnterTitle isDark={isDark}/>
            </div >
            <div className={`nammaCompiler3 ${isDark ? 'dark-theme' : 'light-theme'}`} >
                <NammaCompilerMenuBar isDark={isDark} code={editorCode} setOutput={setOutput} stdin={stdin} />
            </div>
            <div className={`nammaCompiler4 ${isDark ? 'dark-theme' : 'light-theme'}`} >
                <div className={`nammaCompiler4EditorMainDiv ${isDark ? 'dark-theme' : 'light-theme'}`}>
                    <NammaCompilerEditor isDark={isDark} setCode={setEditorCode} />
                </div>
                <div className={`nammaCompiler4EditorSideMain ${isDark ? 'dark-theme' : 'light-theme'}`}>
                    <div className={`nammaCompiler4EditorInput ${isDark ? 'dark-theme' : 'light-theme'}`}>
                        <NammaCompilerInput isDark={isDark} setStdin={setStdin} />
                    </div>
                    <div className={`nammaCompiler4EditorOutput ${isDark ? 'dark-theme' : 'light-theme'}`} style={{ height: '60%' }}>
                        <NammaCompilerOutput isDark={isDark} outputText={output} />
                    </div>
                    {/* <div className={`nammaCompiler4EditorAd ${isDark ? 'dark-theme' : 'light-theme'}`} style={{ position: 'relative' }}>
                        <NammaCompilerAd isDark={isDark} />
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default NammaCompilerMain;
