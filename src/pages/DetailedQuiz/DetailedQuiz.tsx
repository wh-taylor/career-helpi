import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './DetailedQuiz.css';
import rocketImg from '../rocket.png';

interface DetailedQuizProps {
    setPage: (newPage: string) => void
}

type QuestionType = "MultipleChoice" | "Slider";

interface Question {
    id: number;
    name: string;
    body: string;
    options: string[];
    type: QuestionType;
    answered: boolean;
}

const detailedQuestions: Question[] = [
    {id: 1, name: "Question 1", body: "What is your preferred situation?", options: ["", ""], type: "MultipleChoice", answered: false},
    {id: 2, name: "Question 2", body: "Rate how you feel working on this:", options: ["", ""], type: "Slider", answered: false},
    {id: 3, name: "Question 3", body: "You like working in a team", options: ["True", "False"], type: "MultipleChoice", answered: false}
];

export function DetailedQuiz({setPage}: DetailedQuizProps) {
    const [index, setIndex] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [textInput, setInputValue] = useState<string>('Begin typing here...');

    const handleNext = () => {
        if (index < detailedQuestions.length - 1) {
            setIndex(index + 1);
        } else {
            setSubmitted(true);
            setPage("ResultsPage");
        };
    }

    const handleBack = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    const progress = submitted ? 100 : ((index+1) / detailedQuestions.length) * 100;
    const question = detailedQuestions[index];

    return (
        <div className="main-container">
            <h1 className="header">Detailed Quiz</h1>
            <div className="topbuttons">
                <Button className="btn btn-secondary" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>
                    {index === detailedQuestions.length - 1 ? "Submit" : "Next"}
                </Button>
            </div>
            <div className="content">
                <p>{question.body}</p>
            </div>
            <div>
                <textarea className='text-input' value={textInput} onChange={handleInput} />
            </div>
            <div className="progressbarcontainer">
                <ProgressBar now={progress} className="custom-progressbar" variant="danger" label={<img className="progress-label"src={rocketImg} alt=""/>}/>
            </div>
        </div>
    );
}

export default DetailedQuiz;