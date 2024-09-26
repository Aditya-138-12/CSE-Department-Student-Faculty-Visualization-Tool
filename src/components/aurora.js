import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "./ui/aurora-background";
import "./testdll.css";
import Button from '@mui/joy/Button';
import { FlipWordsDemo } from "./flipWordsDemo";

export function BackgroundBeamsDemo() {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate('/home');
    };

    return (
        <>
            <div className="main_div_aur">
                <FlipWordsDemo />
                <p className="pcl">SJCIT-Connect is a dynamic web platform designed to foster collaboration and recognition among students and faculty members at SJCIT. The platform allows students to upload their academic and extracurricular achievements, compare their rankings with peers, and track their progress. Faculty members can use it to upload their research papers, published journals, and other professional accomplishments. Additionally, Heads of Departments (HoDs) can access detailed analytics to monitor performance. SJCIT-Connect aims to create a centralized hub for recognizing achievements and enhancing communication across the institution.</p>
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
                    Explore
                </Button>
            </div>
            <BackgroundBeams />
        </>
    );
}