import React from "react";
import "./questionsParticles.css";

const QuestionsParticles = ({ numberOfQuestions, onQuestionClick, isAnswered, onParticle }) => {

    return (
        <>
            <div className="main-questions-particles">
                <>
                    <div className="display-div">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', gap: '20px', alignItems: "center" }}>
                            <div className="display-question-particle">>_</div>
                            <p>Unanswered Question</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', gap: '20px', alignItems: "center" }}>
                            <div className="display-question-particle Answered">>_</div>
                            <p>Answered Question</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', gap: '20px', alignItems: "center" }}>
                            <div className="display-question-particle onParticle">>_</div>
                            <p>Current Question</p>
                        </div>
                    </div>
                    {Array.from({ length: numberOfQuestions }, (_, index) => (
                        <div
                            key={index}
                            className={`question-particle ${isAnswered[index] ? "Answered" : "notAnswered"} ${index === onParticle ? "onParticle" : ""}`}
                            onClick={() => onQuestionClick(index + 1)}
                        >{index + 1}</div>
                    ))}
                </>
            </div>

        </>
    );
}

export default QuestionsParticles;