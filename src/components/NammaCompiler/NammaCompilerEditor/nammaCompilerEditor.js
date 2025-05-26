import React from 'react';
import { Editor } from '@monaco-editor/react';

const NammaCompilerEditor = ({ isDark, setCode }) => {

    const handleEditorChange = (value, event) => {
        console.log(value);
        setCode(value);
    }

    return (
        <>
            <div className='nammaCompilerEditor' style={{ position: 'relative', height: '100%', width: '100%' }}>
                <Editor
                    height='100%'
                    defaultLanguage='cpp'
                    defaultValue={`#include <iostream>
int main(){
    std::cout << "Still under Construction, users may face performance issues" ;
    std::cout << "Welcome to Namma Compiler! Made by SJCIT CSE CodeArena Club Students" ;
    return 0;
}`
                    }
                    theme={isDark ? 'vs-dark' : 'vs-light'}
                    options={{
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        fontSize: 14,
                        minimap: { enabled: false } // optional, for cleaner layout
                    }}
                    onChange={handleEditorChange}
                />
            </div >
        </>
    );
};

export default NammaCompilerEditor;
