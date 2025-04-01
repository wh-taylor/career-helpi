import { useState } from "react";
import { Button } from "react-bootstrap";
import './BasicQuiz.css';


interface BasicQuizProps {
    setPage: (newPage: string) => void
}
const questions = ["What is your preferred situation?", "1", "2"];

export function BasicQuiz({setPage}: BasicQuizProps) {
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="main-container">
            <div className="return-button-box">
                <Button className="return-button" onClick={()=> setPage("HomePage")}>Return</Button>
            </div>
            <h1 className="header">Basic Quiz</h1>
            <p className="quizdescription">The basic career assessment asks simple multiple choice questions in order to get an idea for the skills and preferences 
                of the taker. 
            </p>
            <div className="topbuttons">
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
                    {index === questions.length -1 ? "Submit" : "Next"}
                </Button>
            </div>
            <div className="content">
                <p>{questions[index]}</p>
            </div>

            <div className="progressbar">
                <progress value={index / questions.length} className="customprogress"/>
            </div>

        </div>
    )
}

export default BasicQuiz;