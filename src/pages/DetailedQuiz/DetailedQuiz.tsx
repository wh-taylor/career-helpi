import { useState, useEffect } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './DetailedQuiz.css';
import rocketImg from '../rocket.png';
import { getApiKey } from '../../App'
import { generateNewDetailedQuestion } from '../../openai'

interface DetailedQuizProps {
    setPage: (newPage: string) => void
}

export interface Question {
    id: number;
    question: string;
    userAnswer: string;
    answered: boolean;
}

export function DetailedQuiz({setPage}: DetailedQuizProps) {
    const [index, setIndex] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function initializeQuiz() {
          if (questions.length === 0) {
            const keyData = getApiKey();
            if (!keyData) {
              console.error("API key not found in localStorage.");
              return;
            }
            const newQuestionText = await generateNewDetailedQuestion(keyData, questions);
      
            setQuestions(prev => [
              ...prev,
              {
                id: prev.length + 1,
                question: newQuestionText,
                userAnswer: "",
                answered: false
              }
            ]);
          }
        }
      
        initializeQuiz();
      }, [questions.length]);

    function handleNext() {
        if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            setSubmitted(true);
            setPage("ResultsPage");
        };
    }

    function handleBack() {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    
    function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setQuestions(prev => prev.map((question, idx) =>
            idx === index ? {...question, userAnswer: value, answered: value.trim() !==""} : question
            )
        );
    }

    const numAnswered = questions.filter(question => question.answered).length;
    const progress = submitted ? 100 : (numAnswered / questions.length) * 100;
    const question = questions[index];

    return (
        <div className="main-container">
            <h1 className="header">Detailed Quiz</h1>
            <div className="topbuttons">
                <Button className="btn btn-secondary" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} disabled={!question.answered}>
                    {index === questions.length - 1 ? "Submit" : "Next"}
                </Button>
            </div>
            <div className="content">
                <div className="question">
                    <p>{question.question}</p>
                </div>
            </div>
            <div>
                <textarea 
                    className='text-input' 
                    placeholder="Begin typing here..." 
                    value={question.userAnswer}
                    onChange={handleInput} />
            </div>
            <div className="progressbarcontainer">
                <ProgressBar now={progress} className="custom-progressbar" variant="danger" label={<img className="progress-label"src={rocketImg} alt=""/>}/>
            </div>
        </div>
    );
}

export default DetailedQuiz;