import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './DetailedQuiz.css';

interface DetailedQuizProps {
    setPage: (newPage: string) => void
}

const questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];

export function DetailedQuiz({setPage}: DetailedQuizProps) {
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="main-container">
            <h1 className="header">Detailed Quiz</h1>
            <div className="topbuttons">
                <Button className="btn btn-secondary" onClick={()=> {
                    if (index !== 0) {
                        setIndex(index - 1);
                    }
                }}>
                    Back
                </Button>
                <Button onClick={()=> {
                    if (index < questions.length) {
                        setIndex(index + 1);
                    } else {
                        setPage("ResultsPage");
                    }
                }}>
                    {index === questions.length ? "Submit" : "Next"}
                </Button>
            </div>
            <div className="content">
                <p>{questions[index] || "Click Submit if you are happy with your answers."}</p>
            </div>
            <div>
                <ProgressBar now={(index / questions.length)*100} className="custom-progressbar" variant="success"/>
            </div>
        </div>
    )
}

export default DetailedQuiz;