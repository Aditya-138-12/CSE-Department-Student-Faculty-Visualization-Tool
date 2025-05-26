import React, { useState } from "react";
import "./testsStartButtonLanding.css";
import { useNavigate } from "react-router-dom";

const StartButtonLanding = ({ testTopic, testTopicNavigate }) => {

    const [isHovered, setisHovered] = useState(false);
    const [timeChosenByUser, settimeChosenByUser] = useState(300);

    const navigate = useNavigate();

    const handleClick = () => {
        const randomKeyToStartTest = (Math.random() * 100);

        navigate(`/tests/${testTopicNavigate}`, { state: { testTopicNavigate, timeChosenByUser } });
    }

    const handleTimeChange = (event) => {
        settimeChosenByUser(Number(event.target.value));
    }

    return (
        <>
            <div className={`main-start-button ${isHovered ? "hovered" : ""}`}>

                <p className="main-start-button-p">{testTopic}</p>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", textAlign: 'center' }}> <p style={{ width: "100%" }}>Select Time</p>
                    <select style={{ margin: "0px", marginRight: "10px", width: "auto", height: "auto", fontSize: "14px" }} onChange={handleTimeChange} value={timeChosenByUser}>
                        <option value={300}>5 Min</option>
                        <option value={600}>10 Min</option>
                        <option value={900}>15 Min</option>
                        <option value={1200}>20 Min</option>
                        <option value={1500}>25 Min</option>
                        <option value={1800}>30 Min</option>
                    </select>
                    <div className="start-button" onClick={handleClick} onMouseEnter={() => setisHovered(true)} onMouseLeave={() => setisHovered(false)}>Start</div>
                </div>
            </div >
        </>
    );
}

export default StartButtonLanding;