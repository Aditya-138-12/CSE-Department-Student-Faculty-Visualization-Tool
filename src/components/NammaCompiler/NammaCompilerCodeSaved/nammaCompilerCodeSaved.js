import { React, useState, useEffect } from 'react';
import { CopyIcon, CopyCheck, XCircle } from 'lucide-react';
import './nammaCompilerCodeSaved.css';

const NammaCompilerCodeSaved = ({ link, setClose, close }) => {

    const [copycheck, setCopycheck] = useState(false);

    const handleClose = (e) => {
        setClose(false);
    }

    const handleCopyLink = (e) => {
        navigator.clipboard.writeText(link);
        setCopycheck(true);
        setTimeout(() => { setCopycheck(false); }, 1500);
    }

    return (
        <>
            {close && <div className='nammaCompilerCodeSavedMainDiv'>
                <div className='nammaCompilerCodeSavedCloseButton' style={{ width: "100%", position: "relative", display: 'flex', justifyContent: 'right', alignItems: 'left' }}><XCircle className='nammaCompilerCodeSavedCloseButtonXCircle' onClick={handleClose} size={20} /></div>
                <p style={{ fontSize: '20px', fontWeight: 'bold', zIndex: "100000000" }}>Code Saved!</p>
                <p style={{ fontSize: '15px', zIndex: "100000000", marginLeft: "100px", marginRight: "100px", textAlign: "space-between" }}>Your code has been successfully saved to the database.<br /><br />
                    Please note that it will be automatically deleted after one week. To extend its availability, click the "Renew" button when viewing the code.<br /><br />
                    You can now access your saved code by clicking the link below.</p>
                <pre className='nammaCompilerCodeSavedpre'><a className='nammaCompilerCodeSaveda' href={link} target="_blank" rel="noreferrer">{link}</a><div className='nammaCompilerCodeSavedCopyButton' onClick={handleCopyLink}>{!copycheck && <CopyIcon size={15} />}{copycheck && < CopyCheck size={15} />}</div></pre>
            </div >}
        </>
    );
};

export default NammaCompilerCodeSaved;
