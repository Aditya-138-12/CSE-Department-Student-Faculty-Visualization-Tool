import React, { useState } from "react";
import './HoDsideBar.css';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SummarizeIcon from '@mui/icons-material/Summarize';

export function HoDSideBar({ onClickonStudentAnalyticsButton, onClickLogOutButton, onClickonFacultyAnalyticsButton, onClickonReportGeneratorButton }) {
    const [isHovered, setisHovered] = useState(false);
    const [isHoveredOnHome, setisHoveredOnHome] = useState(false);
    const [isHoverOnFileUpload, setisHoverOnFileUpload] = useState(false);
    const [isHoverOnCodeIcon, setisHoverOnCodeIcon] = useState(false);
    const [isHoverOnLogoutIcon, setisHoverOnLogoutIcon] = useState(false);
    const [isHoveredOnSummarizer, setisHoveredOnSummarizer] = useState(false);

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

    const handleMouseEnterOnSummarizer = () => {
        setisHoveredOnSummarizer(true);
    }

    const handleMouseLeaveOnSummarizer = () => {
        setisHoveredOnSummarizer(false);
    }

    return (
        <>
            <div className={`HoDsideBarMainDiv ${isHovered ? 'hover' : ''}`}
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

                <div className="sideBarIconContainer" onClick={onClickonStudentAnalyticsButton}>
                    <AutoGraphIcon
                        onMouseEnter={handleMouseEnterOnFileUpload}
                        onMouseLeave={handleMouseLeaveOnFileUpload}
                        fontSize="medium"
                        color="primary"
                        className={`sideBarMainDivFileUploadIcon ${isHoverOnFileUpload ? 'hover' : ''}`}
                    />
                    {isHovered && (
                        <span className="fileUploadLabel">Student Analytics</span>
                    )}
                </div>

                <div className="sideBarIconContainer" onClick={onClickonFacultyAnalyticsButton}>
                    <EqualizerIcon
                        onMouseEnter={handleMouseEnterOnCodeIcon}
                        onMouseLeave={handleMouseLeaveOnCodeIcon}
                        fontSize="medium"
                        color="primary"
                        className={`sideBarMainDivFaculty ${isHoverOnCodeIcon ? 'hover' : ''}`}
                    />
                    {isHovered && (
                        <span className="FacultyLabel">Faculty Analytics</span>
                    )}
                </div>

                <div className="sideBarIconContainer" onClick={onClickonReportGeneratorButton}>
                    <SummarizeIcon
                        onMouseEnter={handleMouseEnterOnSummarizer}
                        onMouseLeave={handleMouseLeaveOnSummarizer}
                        fontSize="medium"
                        color="primary"
                        className={`sideBarMainDivReport ${isHoveredOnSummarizer ? 'hover' : ''}`}
                    />
                    {isHovered && (
                        <span className="ReportLabel">Report Generator</span>
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