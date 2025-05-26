import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "./ui/aurora-background";
import "./testdll.css";
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { FlipWordsDemo } from "./flipWordsDemo";
import { Github, Star, Linkedin } from "lucide-react";

export function BackgroundBeamsDemo() {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate('/home');
    };

    const handleExplorePlacements = () => {
        navigate('/placements');
    }

    const handleTextSection = () => {
        navigate('/tests');
    }

    const btn2 = () => {
        navigate('/');
    }

    const handleExploreGithub = () => {
        window.open('https://github.com/Aditya-138-12/CSE-Department-Student-Faculty-Visualization-Tool', "_blank");
    }

    const handleExploreLinkedin = () => {
        window.open('https://www.linkedin.com/school/s-j-c-institute-of-technology-chickballapur/?originalSubdomain=in', "_blank");
    }

    const handleNammaCompilerSection = () => {
        navigate('/nammaCompiler');
    }

    const [lang, setLang] = useState('en');

    const handleLangChange = () => {
        setLang(lang === 'en' ? 'kn' : 'en');
    }

    return (
        <>
            <Button
                className="btn_uar"
                onClick={handleLangChange}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: "white",
                        border: "1px solid black"
                    },
                }}
                style={{ width: "3%", display: " flex", flexDirection: "row", gap: "0px", marginLeft: "50px", position: "absolute", left: '2%', top: "2%", transform: "translate(-50%, 0%)", verticalAlign: "center", fontSize: "15px", lineHeight: "0" }}
            >
                {lang == 'en' ? "English" : "Kannada"}
            </Button >

            <Button
                className="btn_uar"
                onClick={handleExploreGithub}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: "white",
                        border: "1px solid black"
                    },
                }}
                style={{ width: "10%", display: " flex", flexDirection: "row", gap: "0px", marginLeft: "50px", position: "absolute", left: '85%', top: "2%", transform: "translate(-50%, 0%)", verticalAlign: "center", fontSize: "15px", lineHeight: "0" }}
            >
                {<Star style={{ marginRight: "15px", justifyContent: "center", verticalAlign: "center" }} />}
                {lang == 'en' ? "Star Repo ?" : "ಸ್ಟಾರ್ ರೆಪೋ ?"}
            </Button >
            <Button
                className="btn_uar"
                onClick={handleExploreLinkedin}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: "white",
                        border: "1px solid black"
                    },
                }}
                style={{ width: "3%", minWidth: "1%", marginLeft: "20px", position: "absolute", left: '95%', top: "2%", transform: "translate(-50%, 0%)", verticalAlign: "center", fontSize: "15px", lineHeight: "0" }}
            >
                <Linkedin style={{ marginRight: "0px", textAlign: "center", verticalAlign: "center", padding: "0" }} />
            </Button>

            <div className="main_div_aur">

                <FlipWordsDemo />
                <p className="pcl">{lang == 'en' ? "SJCIT - Connect is a dynamic web platform designed to foster collaboration and recognition among students and faculty members at SJCIT. The platform allows students to upload academic and extracurricular achievements, compare their rankings with peers, and track their progress. Faculty members can use it to upload their research papers, published journals, and other professional accomplishments. Additionally, Head of Department (HoD) can access detailed analytics to monitor performance. SJCIT-Connect aims to create a centralized hub for recognizing achievements and enhancing communication across the institution." : "ಎಸ್‌ಜೆಸಿಐಟಿ-ಕನೆಕ್ಟ್ ಎಂಬುದು ಎಸ್‌ಜೆಸಿಐಟಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಅಧ್ಯಾಪಕರ ನಡುವೆ ಸಹಯೋಗ ಮತ್ತು ಮಾನ್ಯತೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಒಂದು गतಿಶೀಲ ವೆಬ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಆಗಿದೆ. ಈ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನ ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಪಾಠ್ಯೇತರ ಸಾಧನೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು, ತಮ್ಮ ಸಹಪಾಠಿಗಳೊಂದಿಗೆ ರ್ಯಾಂಕ್‌ಗಳನ್ನು ಹೋಲಿಸಬಹುದು ಮತ್ತು ತಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಅನುಸರಿಸಬಹುದು. ಅಧ್ಯಾಪಕರು ತಮ್ಮ ಸಂಶೋಧನಾ ಲೇಖನಗಳು, ಪ್ರಕಟಿತ ಜರ್ನಲ್‌ಗಳು ಮತ್ತು ಇತರ ವೃತ್ತಿಪರ ಸಾಧನೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಇದನ್ನು ಬಳಸಬಹುದು. ಜೊತೆಗೆ, ವಿಭಾಗದ ಮುಖ್ಯಸ್ಥರು (ಹೆಡ್ ಆಫ್ ಡಿಪಾರ್ಟ್‌ಮೆಂಟ್ - HoD) ಪ್ರಕಾರವಿವರಿತ ವಿಶ್ಲೇಷಣೆಯನ್ನೂ ಬಳಸಿ ಕಾರ್ಯಕ್ಷಮತೆಯ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಬಹುದು. ಎಸ್‌ಜೆಸಿಐಟಿ-ಕನೆಕ್ಟ್‌ ನ ಉದ್ದೇಶವೆಂದರೆ ಸಾಧನೆಗಳಿಗೆ ಮಾನ್ಯತೆ ನೀಡಲು ಮತ್ತು ಸಂಸ್ಥೆಯಾದ್ಯಂತ ಸಂವಹನವನ್ನು ಸುಧಾರಿಸಲು ಕೇಂದ್ರಿಕೃತ ಹಬ್ ಒದಗಿಸುವುದು."}</p>
                <Button
                    className="btn_uar"
                    onClick={handleExplore}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: "white",
                            border: "1px solid black"
                        },
                    }}
                >
                    {lang == 'en' ? "Explore" : "ಅನುಸರಿಸಿ"}
                </Button>
                <Button
                    className="btn_uar"
                    onClick={handleExplorePlacements}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: "white",
                            border: "1px solid black"
                        },
                    }}
                    style={{ marginLeft: "50px" }}
                >
                    {lang == 'en' ? "Placements" : "ನೆಮಕಾತಿ ವಿಭಾಗ"}
                </Button>
                <Button
                    className="btn_uar"
                    onClick={handleTextSection}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: "white",
                            border: "1px solid black"
                        },
                    }}
                    style={{ marginLeft: "50px" }}
                >
                    {lang == 'en' ? "Test Section" : "ಪರೀಕ್ಷಾ ವಿಭಾಗ"}
                </Button>
                <Button
                    className="btn_uar"
                    onClick={handleNammaCompilerSection}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: "white",
                            border: "1px solid black"
                        },
                    }}
                    style={{ marginLeft: "50px" }}
                >
                    {lang == 'en' ? "Namma Compiler" : "ನಮ್ಮ ಕಂಪೈಲರ್"}
                </Button>
            </div>
            <BackgroundBeams />
        </>
    );
}