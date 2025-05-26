import React from "react";
import { useState, useEffect } from "react";
import QuestionComponent from "./QuestionPallete";
import "./testsFrontEnd.css";
import StartButtonLanding from "./testsStartButtonsLanding";
import FooterSection from "./testsSectionFooter";
import Header from "./header";

const Tests = () => {



    return (
        <>
            <div className="main-body">

                <Header />

                <div className="main-body-below">
                    <p className="main-body-text">10+ practice tests</p>
                    <h2 className="main-body-heading">For Placement Focus Edition</h2>
                    <p className="main-bodt-desc">Questions from past Placements Tests to help you ace the exam.
                        Say bye to expensive Courses and prep material </p>
                </div>

                <div className="main-how-it-works">
                    <p className="main-how-it-works-heading">Watch How It Works</p>
                    <div className="main-how-it-works-yt">
                        <iframe width="100%" height="100%" style={{ borderRadius: '20px' }} src="https://www.youtube.com/embed/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <p className="main-how-it-works-desc">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 200" class="mr-2 text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48.24-94.78-64-40A8,8,0,0,0,100,88v80a8,8,0,0,0,12.24,6.78l64-40a8,8,0,0,0,0-13.56ZM116,153.57V102.43L156.91,128Z"></path></svg>
                        Learn how our platform can boost your Aptitude score.
                    </p>
                </div>

                <div className="main-start-button-landing">
                    <StartButtonLanding testTopic={"Basic Test - Level 1 (Fundamentals)"} testTopicNavigate={"BTL1F"} />
                    <StartButtonLanding testTopic={"Basic Test - Level 2 (Fundamentals)"} testTopicNavigate={"BTL2F"} />
                    <StartButtonLanding testTopic={"Basic Test - Level 3 (Fundamentals)"} testTopicNavigate={"BTL3F"} />
                    <StartButtonLanding testTopic={"Java Fundamentals"} testTopicNavigate={"JFT1"} />
                    <StartButtonLanding testTopic={"Git - A Version Control System"} testTopicNavigate={"GT1"} />
                    <StartButtonLanding testTopic={"Piper - A Centralized Version Control System"} testTopicNavigate={"PT1"} />
                    <StartButtonLanding testTopic={"Data Interpretation"} testTopicNavigate={"DIT1"} />
                    <StartButtonLanding testTopic={"Logical Reasoning"} testTopicNavigate={"LRT1"} />
                    <StartButtonLanding testTopic={"Problem Solving"} testTopicNavigate={"PST1"} />
                    <StartButtonLanding testTopic={"Verbal Ability"} testTopicNavigate={"VAT1"} />
                    <StartButtonLanding testTopic={"Quantitative Aptitude"} testTopicNavigate={"QAT1"} />
                </div>

                {/*
                    <div>
                        {questions.length > 0 ? (
                            <QuestionComponent questionData={questions[currentQuestionIndex]} selectedAnswer={selectedAnswer[questions[currentQuestionIndex]?.id] || ""} onAnswerChange={handleAnswerChange} />
                        ) : (
                            <p>Loading questions...</p>
                        )}
                        <div className="parent-next-button">
                            {currentQuestionIndex < questions.length - 1 && (
                                <>

                                    <div className="next-button" onClick={handleNext}>Next</div>

                                </>
                            )}
                            {currentQuestionIndex > 0 && (
                                <>

                                    <div className="next-button" onClick={handlePrevious}>Previous</div>

                                </>
                            )}
                            {currentQuestionIndex == questions.length - 1 && (
                                <>

                                    <div className="submit-button" onClick={handleSubmit}>Submit</div>
                                    <div className="result-button">Your Score is: {correctAnswer}/{questions.length}</div>

                                </>
                            )}
                        </div>
                    </div >

                            */}

                <FooterSection />

            </div>
        </>
    );
}

export default Tests;