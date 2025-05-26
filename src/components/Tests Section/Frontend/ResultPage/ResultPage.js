import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header";
import "./resultPage.css"
import MarksCards from "./marksCards";

const ResultPage = () => {

    const location = useLocation();
    const { score, totalQuestions, testTopicNavigate } = location.state || { score: 0, totalQuestions: 0, testTopicNavigate: 0 }

    console.log(testTopicNavigate);

    return (
        <>

            <Header />

            <div className="super-overview-div">

                <div className="main-overview-div">
                    <MarksCards heading={"TOTAL"} fontSizeByAdmin={"16px"} colorDefine="#3c4852" score={score} totalQuestions={totalQuestions} />
                    <MarksCards heading={"CORRECT"} colorDefine="#08bd80" fontSizeByAdmin={"16px"} score={score} />
                    <MarksCards heading={"INCORRECT"} colorDefine="#eb5757" fontSizeByAdmin={"16px"} score={score - totalQuestions} />
                    <MarksCards heading={"UNANSWERED"} colorDefine="#ffad3b" fontSizeByAdmin={"16px"} score={score} />
                    <MarksCards heading={"RANK"} colorDefine="#2d81f7" fontSizeByAdmin={"16px"} score={score} rankOptionTrue={true} />
                </div>
            </div>



        </>
    );
}

export default ResultPage;