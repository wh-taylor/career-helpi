import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './DetailedQuiz.css';
import rocketImg from '../rocket.png';

interface DetailedQuizProps {
    setPage: (newPage: string) => void
}

interface Question {
    id: number;
    name: string;
    body: string;
    answered: boolean;
}

const detailedQuestions: Question[] = [
    {id: 1, name: "Question 1", body: "Describe a perfect day in your life?", answered: false},
    {id: 2, name: "Question 2", body: "What are some non-negotiables for your career?", answered: false},
    {id: 3, name: "Question 3", body: "What are you passionate about? What do you get most excited for?", answered: false}
];

export function DetailedQuiz({setPage}: DetailedQuizProps) {
    const [index, setIndex] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});

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
        const value = event.target.value;
        setAnswers({...answers, [question.id]: value});

        if (value.trim() !== '') {
            detailedQuestions[index].answered = true;
        } else{
            detailedQuestions[index].answered = false;
        }
    }

    const numAnswered = detailedQuestions.filter(question => question.answered).length;
    const progress = submitted ? 100 : (numAnswered / detailedQuestions.length) * 100;
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
                <div className="question">
                    <p>{question.body}</p>
                </div>
            </div>
            <div>
                <textarea 
                    className='text-input' 
                    placeholder="Begin typing here..." 
                    value={answers[question.id] || ''}
                    onChange={handleInput} />
            </div>
            <div className="progressbarcontainer">
                <ProgressBar now={progress} className="custom-progressbar" variant="danger" label={<img className="progress-label"src={rocketImg} alt=""/>}/>
            </div>
        </div>
    );
}

export default DetailedQuiz;