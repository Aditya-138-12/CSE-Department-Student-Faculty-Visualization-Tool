import { React, useRef } from 'react';
import { Editor } from '@monaco-editor/react';

const NammaCompilerEditor = ({ isDark, setCode, code, lang, viewMode }) => {

    const handleEditorChange = (value, event) => {
        console.log(value);
        setCode(value);
    }

    const editorRef = useRef();

    return (
        <>
            <div className='nammaCompilerEditor' style={{ position: 'relative', height: '100%', width: '100%' }}>
                <Editor
                    height='100%'
                    language={lang}
                    value={code}
                    theme={isDark ? 'vs-dark' : 'vs-light'}
                    options={{
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        fontSize: 14,
                        minimap: { enabled: false }, // optional, for cleaner layout
                        readOnly: viewMode
                    }}
                    onChange={handleEditorChange}
                    onMount={(editor) => (editorRef.current = editor)}  // For now it is not usefull.
                />
            </div >
        </>
    );
};

export default NammaCompilerEditor;
