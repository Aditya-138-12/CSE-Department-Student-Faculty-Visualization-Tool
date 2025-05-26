import React from "react";

const MarksCards = ({ score, totalQuestions, heading, colorDefine, fontSizeByAdmin, rankOptionTrue }) => {
    return (
        <>
            <div className="overview-div-main-total-marks-scored">
                <p className="overview-div-main-total-marks-scored-p-top" style={{ fontSize: fontSizeByAdmin }}>{heading}</p>
                <p className="overview-div-main-total-marks-scored-p-marks-score" style={{ color: colorDefine }}>{score}{totalQuestions && <span>/</span>}{!rankOptionTrue && < p className="overview-div-main-total-marks-scored-span-total-score" style={{ fontSize: fontSizeByAdmin, marginTop: "0px" }}>{totalQuestions} Marks</p >}</p>
            </div >
        </>
    );
}

export default MarksCards;