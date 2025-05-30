import React, { useState } from 'react';
import { Play, Info, ChevronDown } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';
import './nammaCompilerMenuBar.css';
import { Buffer } from 'buffer';
import { set } from 'firebase/database';
import _ from 'lodash';

const NammaCompilerMenuBar = ({ langIdFromDb, setMainLangId, setLangSrc, langSrcFromDb, langFromDb, langVersionFromDb, isDark, code, setOutput, stdin, stdinFromDb, setCode, setLang, setCompilerError, langVersion, setLangVersion, isViewMode }) => {

    const [isLoading, setIsLoading] = useState(0);
    const [langId, setLangId] = useState(105);

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
                language_id: langIdFromDb ? langIdFromDb : langId,
                source_code: Buffer.from(sourceCode).toString('base64'),
                stdin: Buffer.from(isViewMode ? stdinFromDb : stdin).toString('base64')
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
                setCompilerError();
                setIsLoading(0);
            }
            if (errors.trim()) {
                console.error('Errors:', errors);
                setOutput(errors);
                setIsLoading(0);
            }

            if (compileOutput.trim()) {
                console.error('Compile errors:', compileOutput);
                setCompilerError(compileOutput);
                setOutput();
                setIsLoading(0);
            }
        } catch (err) {
            console.error('Request failed:', err);
        }
    }

    const [mainLanguageSlected, setMainLanguageSlected] = useState('C++');
    const [mainLanguageSlectedImgSrc, setMainLanguageSlectedImgSrc] = useState('https://www.mycompiler.io/static/img/lang/cpp_small.png');

    const handleLanguageSelect = (e) => {

        const codeTemplates = {
            "C++": `#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}
`,
            "C": `#include <stdio.h>
          
int main() {
  printf("Hello, World!\\n");
  return 0;
}
`,
            "Python": `print("Hello, World!")`,
            "Java": `public class Main {
public static void main(String[] args) {
  System.out.println("Hello, World!");
  }
}
`,
            "C#": `using System;
          
class Program {
  static void Main() {
      Console.WriteLine("Hello, World!");
    }
}
`,
            "Ruby": `puts 'Hello, World!'`,
            "Go": `package main
          
import "fmt"
          
  func main() {
      fmt.Println("Hello, World!")
  }
`,
            "JavaScript": `console.log("Hello, World!");`,
            "Typescript": `console.log("Hello, World!");`,
            "PHP": `<?php
          
  echo "Hello, World!";
          
?>`,
            "Bash": `#!/bin/bash
          
          echo "Hello, World!"`,
            "Octave": `disp("Hello, World!")`,
            "Lua": `print("Hello, World!")`,
            "Erlang": `-module(hello).
          -export([start/0]).
          
          start() ->
              io:fwrite("Hello, World!~n").`,
            "Perl": `print "Hello, World!\\n";`,
            "Rust": `fn main() {
              println!("Hello, World!");
          }`
        };

        setCode(codeTemplates[e.target.dataset.lang]);
        setLang(e.target.dataset.langraw);

        console.log("This is the Language: ", e.target.dataset);
        setMainLanguageSlected(e.target.dataset.lang);

        console.log("This is the Language ID: ", e.target.dataset.id);
        setLangId(e.target.dataset.id);
        setMainLangId(e.target.dataset.id);

        console.log("This is the Language Version: ", e.target.dataset.langversion);
        setLangVersion(e.target.dataset.langversion);

        console.log("This is the Language Icon: ", e.target.dataset.langiconsrc);
        setMainLanguageSlectedImgSrc(e.target.dataset.langiconsrc);
        setLangSrc(e.target.dataset.langiconsrc);
    }

    return (
        <>
            <div className='nammaCompilerMenuBar'>
                <div className='nammaCompilerMenuBarItem'>
                    <p className={`nammaCompilerMenuBarLanguageSelect ${isDark ? 'dark-theme' : 'light-theme'}`}>
                        <img className='nammaCompilerMenuBarLanguageIcon' src={isViewMode ? langSrcFromDb : mainLanguageSlectedImgSrc}></img>
                        <p className='nammaCompilerMenuBarLanguageName'>{isViewMode ? _.capitalize(langFromDb) : mainLanguageSlected}</p>
                        {!isViewMode && <>
                            <ChevronDown size={25} />
                            <div className={`nammaCompilerMenuBarLanguageSelectMainDiv ${isDark ? 'dark-theme' : 'light-theme'}`} onClick={handleLanguageSelect}>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='C++' data-langraw='cpp' data-id='105' data-langversion='C++ (GCC 14.1.0)' data-langiconsrc='https://www.mycompiler.io/static/img/lang/cpp_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/cpp_small.png' />C++
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='C' data-langraw='c' data-id='110' data-langVersion='C (Clang 19.1.7)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/c_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/c_small.png' />C
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='C#' data-langraw='csharp' data-id='51' data-langVersion='C# (Mono 6.6.0.161)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/csharp_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/csharp_small.png' />C#
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Java' data-langraw='java' data-id='91' data-langVersion='Java (JDK 17.0.6)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/java_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/java_small.png' />Java
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Python' data-langraw='python' data-id='109' data-langVersion='Python (3.13.2)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/python_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/python_small.png' />Python
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Ruby' data-langraw='ruby' data-id='72' data-langVersion='Ruby (2.7.0)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/ruby_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/ruby_small.png' />Ruby
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Go' data-langraw='go' data-id='107' data-langVersion='Go (1.23.5)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/go_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/go_small.png' />Go
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Typescript' data-langraw='typescript' data-id='101' data-langVersion='TypeScript (5.6.2)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/typescript_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/typescript_small.png' />Typescript
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='PHP' data-langraw='php' data-id='98' data-langVersion='PHP (8.3.11)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/php_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/php_small.png' />PHP
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Bash' data-langraw='bash' data-id='46' data-langVersion='Bash (5.0.0)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/bash_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/bash_small.png' />Bash
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Octave' data-langraw='octave' data-id='66' data-langVersion='Octave (5.1.0)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/octave_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/octave_small.png' />Octave
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Lua' data-langraw='lua' data-id='64' data-langVersion='Lua (5.3.5)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/lua_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/lua_small.png' />Lua
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Erlang' data-langraw='erlang' data-id='58' data-langVersion='Erlang (OTP 22.2)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/erlang_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/erlang_small.png' />Erlang
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Perl' data-langraw='perl' data-id='85' data-langVersion='Perl (5.28.1)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/perl_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/perl_small.png' />Perl
                                </div>
                                <div className='nammaCompilerMenuBarLanguageSelectMainDivItem' data-lang='Rust' data-langraw='rust' data-id='108' data-langVersion='Rust (1.85.0)' data-langIconSrc='https://www.mycompiler.io/static/img/lang/rust_small.png'>
                                    <img style={{ height: '80%' }} src='https://www.mycompiler.io/static/img/lang/rust_small.png' />Rust
                                </div>
                            </div>
                        </>}
                    </p>
                    <p className={`nammaCompilerMenuBarLanguageVersion ${isDark ? 'dark-theme' : 'light-theme'}`}><Info size={15} /><span className={`nammaCompilerLangVersion ${isDark ? 'dark-theme' : 'light-theme'}`}>{isViewMode ? langVersionFromDb : langVersion}</span></p>
                </div >
                <div className='nammaCompilerMenuBarItem'>
                    <p className='nammaCompilerMenuBarRunButton' onClick={handleCodeSubmit}>{isLoading ? (<TailSpin height={20} width={20} color="white" />) : (<><Play size={20} /> Run</>)}</p>
                </div>
            </div >
        </>
    );
};

export default NammaCompilerMenuBar;    
