import React, { useState } from 'react';
import { Play, Info, ChevronDown } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';
import './nammaCompilerMenuBar.css';
import { Buffer } from 'buffer';

const NammaCompilerMenuBar = ({ isDark, code, setOutput, stdin }) => {

    const [isLoading, setIsLoading] = useState(0);

    const handleCodeSubmit = async () => {
        setIsLoading(1);
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*';

        const sourceCode = code;

        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '3794186eb4msh0d9d894d4da9e3bp174356jsn87e45d5743f7',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language_id: 103,
                source_code: Buffer.from(sourceCode).toString('base64'),
                stdin: Buffer.from(stdin).toString('base64')
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            const output = Buffer.from(result.stdout || '', 'base64').toString();
            const errors = Buffer.from(result.stderr || '', 'base64').toString();
            const compileOutput = Buffer.from(result.compile_output || '', 'base64').toString();

            if (output.trim()) {
                console.log('Output:', output);
                setOutput(output);
                setIsLoading(0);
            }
            if (errors.trim()) {
                console.error('Errors:', errors);
                setOutput(errors);
                setIsLoading(0);
            }

            if (compileOutput.trim()) {
                console.error('Compile errors:', compileOutput);
                setOutput(compileOutput);
                setIsLoading(0);
            }
        } catch (err) {
            console.error('Request failed:', err);
        }
    }

    return (
        <>
            <div className='nammaCompilerMenuBar'>
                <div className='nammaCompilerMenuBarItem'>
                    <p className={`nammaCompilerMenuBarLanguageSelect ${isDark ? 'dark-theme' : 'light-theme'}`}>
                        <img className='nammaCompilerMenuBarLanguageIcon' src='https://www.mycompiler.io/static/img/lang/cpp_small.png'></img>
                        <p className='nammaCompilerMenuBarLanguageName'>C++</p>
                        <ChevronDown size={25} />
                        <div className={`nammaCompilerMenuBarLanguageSelectMainDiv ${isDark ? 'dark-theme' : 'light-theme'}`}>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='cpp' data-id='105' data-langVersion='C++ (GCC 14.1.0)'>
                                <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/cpp_small.png' />C++
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='c' data-id='110' data-langVersion='C (Clang 19.1.7)'>
                                <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/c_small.png' />C
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='csharp' data-id='51' data-langVersion='C# (Mono 6.6.0.161)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/csharp_small.png' />C#
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='java' data-id='91' data-langVersion='Java (JDK 17.0.6)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/java_small.png' />Java
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='python' data-id='109' data-langVersion='Python (3.13.2)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/python_small.png' />Python
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='ruby' data-id='72' data-langVersion='Ruby (2.7.0)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/ruby_small.png' />Ruby
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='go' data-id='107' data-langVersion='Go (1.23.5)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/go_small.png' />Go
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='typescript' data-id='101' data-langVersion='TypeScript (5.6.2)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/typescript_small.png' />Typescript
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='php' data-id='98' data-langVersion='PHP (8.3.11)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/php_small.png' />PHP
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='bash' data-id='46' data-langVersion='Bash (5.0.0)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/bash_small.png' />Bash
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='octave' data-id='66' data-langVersion='Octave (5.1.0)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/octave_small.png' />Octave
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='lua' data-id='64' data-langVersion='Lua (5.3.5)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/lua_small.png' />Lua
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='erlang' data-id='58' data-langVersion='Erlang (OTP 22.2)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/erlang_small.png' />Erlang
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='perl' data-id='85' data-langVersion='Perl (5.28.1)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/perl_small.png' />Perl
                            </div>
                            <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='rust' data-id='108' data-langVersion='Rust (1.85.0)'>
                                <img style={{ height: '80%' }} src='	https://www.mycompiler.io/static/img/lang/rust_small.png' />Rust
                            </div>
                        </div>
                    </p>
                    <p className={`nammaCompilerMenuBarLanguageVersion ${isDark ? 'dark-theme' : 'light-theme'}`}><Info size={15} /></p>
                </div >
                <div className='nammaCompilerMenuBarItem'>
                    <p className='nammaCompilerMenuBarRunButton' onClick={handleCodeSubmit}>{isLoading ? (<TailSpin height={20} width={20} color="white" />) : (<><Play size={20} /> Run</>)}</p>
                </div>
            </div >
        </>
    );
};

export default NammaCompilerMenuBar;    
