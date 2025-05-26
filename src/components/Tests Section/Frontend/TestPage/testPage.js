import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Snackbar, SnackbarContent, Button } from "@mui/material";

import questionsDataGT1 from "../../Questions/Git_test.json";
import questionsDataBLTF1 from "../../Questions/test1.json";
import questionsDataPT1 from "../../Questions/Piper_test.json";
import questionsDataDIT1 from "../../Questions/DataInterpretation_test.json";
import questionsDataLRT1 from "../../Questions/logicalReasoning_test.json";
import questionsDataPST1 from "../../Questions/ProblemSolving_test.json";
import questionDataVAT1 from "../../Questions/VerbalAbility_test.json";
import questionsDataQAT1 from "../../Questions/QuantitativeAptitude_test.json";
import questionsDataJFT1 from "../../Questions/JavaFundamentals_test.json";
import questionsDataBLT2 from "../../Questions/BasicLevel2_test.json";
import questionsDataBLT3 from "../../Questions/BasicLevel3_test.json";

import QuestionComponent from "../QuestionPallete";
import { useParams } from "react-router-dom";
import QuestionsParticles from "./questionsParticles";
import Header from "../header";
import FooterSection from "../testsSectionFooter";
import { testReset } from "@mui/joy/Tooltip/Tooltip";


const TestPage = ({ score }) => {

    const [questions, setQuestions] = useState([]);
    const [topic, setTopic] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswers] = useState({});
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [isAnswered, setIsAnswered] = useState(Array(questions.length).fill(false));
    const [redClass, setredClass] = useState('blue');                               /// This state is used as a Classname to change the color of the timer from blue to red once the time remaining is less than 1 Min.
    const [showSnackbar, setShowSnackbar] = useState(false);                        /// This state is used to show the Snackbar.
    const [SnackBarShown, setSnackBarShown] = useState(true);                       /// This state ensures that the Snackbar is shown once.
    const [simpleAlertDivTimer, setsimpleAlertDivTimer] = useState(5);              /// This state is used for the countdown in the Alert div when the user directly opens up a test URL.
    const [isTestSubmitted, setIsTestIsSubmitted] = useState(false);                /// New State to track whether the Test is submitted by the user or not.

    const location = useLocation();

    let { testTopicNavigate, timeChosenByUser } = location.state || { testTopicNavigate: false, timeChosenByUser: 0 };

    const { testID } = useParams();

    const [timeLeft, setTimeLeft] = useState(timeChosenByUser);

    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        ///console.log("The Chosed Time by the Student is: ", timeChosenByUser);

        let interval;
        let redirectInterval;

        if (testTopicNavigate) {

            if (timeLeft < 60) {
                setredClass("red");
                setShowSnackbar(true);
                setInterval(() => { setSnackBarShown(false); }, 5000)

            }

            if (isTimerRunning && timeLeft > 0) {
                interval = setInterval(() => {
                    setTimeLeft((prevTIme) => prevTIme - 1);
                }, 1000);
            } else if (timeLeft === 0) {
                handleSubmit();
                setIsTimerRunning(false);
            }
            return () => clearInterval(interval);
        } else {
            clearInterval(testTopicNavigate);
            redirectInterval = setInterval(() => {
                setsimpleAlertDivTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(simpleAlertDivTimer);
                        navigate('/tests');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(interval);
            clearInterval(redirectInterval);
        };

    }, [isTimerRunning, timeLeft, testTopicNavigate, navigate, isTestSubmitted]);

    const FormatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        console.log(selectedAnswer);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }

    const handleSubmit = () => {
        testTopicNavigate = 0;
        let score = 0;

        questions.forEach((question) => {
            if (selectedAnswer[question.id] === question.correctAnswer) {
                score += 1;
            }
        });

        setCorrectAnswer(score);
        setIsTimerRunning(false);
        ///clearInterval(testTopicNavigate);
        testTopicNavigate = 0;
        setIsTestIsSubmitted(true);
        navigate("/tests/result", { state: { score, totalQuestions: questions.length, testTopicNavigate }, replace: true });
        //alert(`Your Score is ${score} / ${questions.length}`)

    }

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));

        setIsAnswered((prevIsAnswered) => {
            const updateIsAnswered = [...prevIsAnswered];
            updateIsAnswered[questionId - 1] = true;
            return updateIsAnswered;
        });
    };

    /* A Simplified way to understand this is implemented inline
    const handleQuestionClick = (questionNumber) => {
        setCurrentQuestionIndex(questionNumber - 1)
    }
    */

    useEffect(() => {

        const fetchData = () => {
            switch (testID) {
                case "GT1":
                    setQuestions(questionsDataGT1.questions);
                    setTopic(questionsDataGT1.topic);
                    break;
                case "BTL1F":
                    setQuestions(questionsDataBLTF1.questions);
                    setTopic(questionsDataBLTF1.topic);
                    break;
                case "BTL2F":
                    setQuestions(questionsDataBLT2.questions);
                    setTopic(questionsDataBLT2.topic);
                    break;
                case "BTL3F":
                    setQuestions(questionsDataBLT3.questions);
                    setTopic(questionsDataBLT3.topic);
                    break;
                case "PT1":
                    setQuestions(questionsDataPT1.questions);
                    setTopic(questionsDataPT1.topic);
                    break;
                case "DIT1":
                    setQuestions(questionsDataDIT1.questions);
                    setTopic(questionsDataDIT1.topic);
                    break;
                case "LRT1":
                    setQuestions(questionsDataLRT1.questions);
                    setTopic(questionsDataLRT1.topic);
                    break;
                case "PST1":
                    setQuestions(questionsDataPST1.questions);
                    setTopic(questionsDataPST1.topic);
                    break;
                case "VAT1":
                    setQuestions(questionDataVAT1.questions);
                    setTopic(questionDataVAT1.topic);
                    break;
                case "QAT1":
                    setQuestions(questionsDataQAT1.questions);
                    setTopic(questionsDataQAT1.topic);
                    break;
                case "JFT1":
                    setQuestions(questionsDataJFT1.questions);
                    setTopic(questionsDataJFT1.topic);
                    break;
            }
        }

        fetchData();
    }, [testID]);

    return (
        <>
            <div style={{ position: "absolute", backgroundColor: "", height: "100%", width: "100%" }}>

                <div style={{ backgroundColor: "", marginBottom: "0px", position: "relative" }}>
                    <Header />
                </div>

                <div style={{ backgroundColor: "", height: "calc(100% - 8vh)", marginTop: "0px", position: "relative", paddingTop: "10px", paddingBottom: " 0px" }}>

                    <u><p style={{ position: "relative", fontFamily: "satoshi", textAlign: "center", fontSize: "40px", marginTop: "0px", marginBottom: "0", fontStyle: 'normal !important', fontWeight: 'bold' }}>{topic}</p></u>

                    <div className="timer-test" style={{ textAlign: "center", marginBottom: "50px", marginTop: "20px", fontFamily: "satoshi", fontSize: '24px' }}>Time Left: <span style={{ color: `${redClass}` }}>{FormatTime(timeLeft)}</span></div>

                    {SnackBarShown && <Snackbar
                        open={showSnackbar}
                        autoHideDuration={6000}
                        onClose={() => setShowSnackbar(false)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}

                    >
                        <SnackbarContent
                            style={{ backgroundColor: "red", color: "#fff", padding: "15px" }} // Primary color
                            message="Less than 1 minute remaining!"
                            action={
                                <Button color="inherit" size="small" onClick={() => { setShowSnackbar(false); setSnackBarShown(false); }}>
                                    Close
                                </Button>
                            }
                        />
                    </Snackbar >}

                    {!testTopicNavigate && <div className="alert-before-exam-start-main" style={{ height: "" }}>
                        <div className="alert-before-exam-start-inner" style={{ fontFamily: "satoshi", fontSize: "24px", textAlign: "center", fontWeight: "bold", display: "flex", flexDirection: "column" }}>
                            <p style={{ marginTop: "0px" }}>You Cannot Start the test this way, please Start the test from your dashboard.</p>
                            <p style={{ marginTop: "0px", marginBottom: "0px" }}>Redirecting to dashboard in {simpleAlertDivTimer}</p>
                            <div className="preloader-div"></div>
                        </div>
                    </div>
                    }

                    <div className="super-main-div">
                        {
                            <div className="main-test-div" >
                                {questions.length > 0 ? (
                                    <>

                                        <QuestionComponent questionData={questions[currentQuestionIndex]} selectedAnswer={selectedAnswer[questions[currentQuestionIndex]?.id] || ""} onAnswerChange={handleAnswerChange} />

                                    </>
                                ) : (
                                    <p>Loading questions...</p>
                                )}

                                <QuestionsParticles numberOfQuestions={questions.length} onQuestionClick={(n) => setCurrentQuestionIndex(n - 1)} isAnswered={isAnswered} onParticle={currentQuestionIndex} />

                            </div >

                        }

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
                                    {/*<div className="result-button">Your Score is: {correctAnswer}/{questions.length}</div>*/}

                                </>
                            )}
                        </div>

                    </div>

                </div>

                <div>
                    <FooterSection />
                </div>
            </div>
        </>
    );
}

export default TestPage;