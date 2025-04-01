import { useState } from "react";
import { Button } from "react-bootstrap";
import './DetailedQuiz.css';

interface DetailedQuizProps {
    setPage: (newPage: string) => void
}

const questions = ["What is your preferred situation?", "1", "2"];

export function DetailedQuiz({setPage}: DetailedQuizProps) {
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="main-container">
            <div className="return-button-box">
                <Button className="return-button" onClick={()=> setPage("HomePage")}>Return</Button>
            </div>
            <h1 className="">Detailed Quiz</h1>
            <p>The detailed career assessment asks simple multiple choice questions in order to get an idea for the skills and preferences 
                of the taker. 
            </p>
            <div className="d-flex justify-content-between">
                <Button className="btn btn-secondary" onClick={()=> {   
                    if (index !== 0) {
                        setIndex(index - 1);
                    }
                }}>
                    Back
                </Button>
                <Button onClick={()=> {
                    if (index !== 2) {
                        setIndex(index + 1);
                    }
                }}>
                    Next
                </Button>
            </div>
            <p>{questions[index]}</p>
        </div>
    )
}

export default DetailedQuiz;