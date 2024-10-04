import React, { useState } from "react";
import './sideBar.css';
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CodeIcon from '@mui/icons-material/Code';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export function SideBar({ onClickonUploadButton, onClickLogOutButton }) {
    const [isHovered, setisHovered] = useState(false);
    const [isHoveredOnHome, setisHoveredOnHome] = useState(false);
    const [isHoverOnFileUpload, setisHoverOnFileUpload] = useState(false);
    const [isHoverOnCodeIcon, setisHoverOnCodeIcon] = useState(false);
    const [isHoverOnLogoutIcon, setisHoverOnLogoutIcon] = useState(false);

    const handleMouseEnter = () => {
        setisHovered(true);
    }

    const handleMouseLeave = () => {
        setisHovered(false);
    }

    const handleMouseEnterOnHome = () => {
        setisHoveredOnHome(true);
    }

    const handleMouseLeaveOnHome = () => {
        setisHoveredOnHome(false);
    }

    const handleMouseEnterOnFileUpload = () => {
        setisHoverOnFileUpload(true);
    }

    const handleMouseLeaveOnFileUpload = () => {
        setisHoverOnFileUpload(false);
    }

    const handleMouseEnterOnCodeIcon = () => {
        setisHoverOnCodeIcon(true);
    }

    const handleMouseLeaveOnCodeIcon = () => {
        setisHoverOnCodeIcon(false);
    }

    const handleMouseEnterOnLogoutIcon = () => {
        setisHoverOnLogoutIcon(true);
    }

    const handleMouseLeaveOnLogoutIcon = () => {
        setisHoverOnLogoutIcon(false);
    }

    return (
        <>
            <div className={`sideBarMainDiv ${isHovered ? 'hover' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="sideBarIconContainer" >
                    <HomeIcon
                        onMouseEnter={handleMouseEnterOnHome}
                        onMouseLeave={handleMouseLeaveOnHome}
                        fontSize="medium"
                        color="primary"
                        className={`sideBarMainDivHomeIcon ${isHoveredOnHome ? 'hover' : ''}`}
                    />
                </div>
                <hr className={`horizontalLine ${isHovered ? 'hover' : ''}`} />

                <div className="sideBarIconContainer" onClick={onClickonUploadButton}>
                    <FileUploadIcon
                        onMouseEnter={handleMouseEnterOnFileUpload}
                        onMouseLeave={handleMouseLeaveOnFileUpload}
                        fontSize="medium"
                        color="primary"
                        className={`sideBarMainDivFileUploadIcon ${isHoverOnFileUpload ? 'hover' : ''}`}
                    />
                    {isHovered && (
                        <span className="fileUploadLabel">Student Upload</span>
                    )}
                </div>

                <div className="sideBarIconContainer">
                    <CodeIcon
                        onMouseEnter={handleMouseEnterOnCodeIcon}
                        onMouseLeave={handleMouseLeaveOnCodeIcon}
                        fontSize="medium"
                        color="disabled"
                        className={`sideBarMainDivCodeIcon ${isHoverOnCodeIcon ? 'hover' : ''}`}
                    />
                    {isHovered && (
                        <span className="CodeIconLabel">Student Data API</span>
                    )}
                </div>

                <div className="sideBarIconContainer" onClick={onClickLogOutButton}>
                    <ExitToAppIcon
                        onMouseEnter={handleMouseEnterOnLogoutIcon}
                        onMouseLeave={handleMouseLeaveOnLogoutIcon}
                        fontSize="medium"
                        color="error"
                        className={`sideBarMainDivLogoutIcon ${isHoverOnLogoutIcon ? 'hover' : ''}`}
                    />
                    {isHovered && (
                        <span className="LogoutIconLabel">Logout</span>
                    )}
                </div>

            </div>
        </>
    );
} 