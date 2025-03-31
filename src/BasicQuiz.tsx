import { useState } from "react";
import { Button } from "react-bootstrap";


interface BasicQuizProps {
    setPage: (newPage: string) => void
}
const questions = ["What is your preferred situation?", "1", "2"];

export function BasicQuiz({setPage}: BasicQuizProps) {
    const [index, setIndex] = useState<number>(0);
    const [question, setQuestion] = useState<string>(questions[index]);
    return (
        <div className="">
            <h1 className="">Basic Quiz</h1>
            <p>The basic career assessment asks simple multiple choice questions in order to get an idea for the skills and preferences 
                of the taker. 
            </p>
            <div className="d-flex justify-content-between">
                <Button 
                className="btn btn-secondary"
                onClick={()=> 
                {
                    if (index !== 0) {
                        setIndex(index - 1);
                    }
                    setQuestion(questions[index]);

                }}>
                    Back
                </Button>
                <Button 
                onClick={()=> 
                {
                    if (index !== 2) {
                        setIndex(index + 1);
                    }
                    setQuestion(questions[index]);

                }}>
                    Next
                </Button>
            </div>
            <p>{question}</p>

        </div>
    )
}

export default BasicQuiz;