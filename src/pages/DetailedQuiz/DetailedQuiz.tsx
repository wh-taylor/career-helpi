import { useState, useEffect } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './DetailedQuiz.css';
import rocketImg from '../rocket.png';
import { getApiKey, generateNewDetailedQuestion } from '../../openai'

interface DetailedQuizProps {
    setPage: (newPage: string) => void
}

export interface DetailedQuestion {
    id: number;
    question: string;
    userAnswer: string;
    answered: boolean;
}

export function DetailedQuiz({setPage}: DetailedQuizProps) {
    const [index, setIndex] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [questions, setQuestions] = useState<DetailedQuestion[]>([]);
    const [loading, setLoading] = useState(false);

    const TOTAL_QUESTIONS = 10;

    async function generateAndAddNewQuestion(currentQuestions: Question[]) {
        const newQuestionText = await generateNewDetailedQuestion(currentQuestions);
    
        if (currentQuestions.some(q => q.question === newQuestionText)) {
            console.warn("Duplicate question detected. Skipping generation.");
            return;
        }
    
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

    useEffect(() => {
        if (questions.length === 0) {
            setQuestions(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    question: "What activities or moments in your life have made you feel most authentic and energized, and how might those experiences guide your future professional journey?",
                    userAnswer: "",
                    answered: false
                }
            ])
        }
    });

    async function handleNext() {
        if (index < questions.length - 1) {
            setIndex(prev => prev + 1);
        } else if (questions.length < TOTAL_QUESTIONS) {
            setLoading(true);
            const keyData = getApiKey();
            if (!keyData) {
                console.error("API key not found in localStorage.");
                return;
            }
            await generateAndAddNewQuestion([...questions]);
            setLoading(false);
            setIndex(prev => prev + 1); 
        } else {
            setSubmitted(true);
            setPage("ResultsPage");
        }
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

    if (questions.length === 0 || loading) {
        return <div>Loading question...</div>;
    }

    const numAnswered = questions.filter(question => question.answered).length;
    const progress = submitted ? 100 : (numAnswered / TOTAL_QUESTIONS) * 100;
    const question = questions[index];

    return (
        <div className="detailed-main-container">
            <h1 className="header">Detailed Quiz</h1>
            <div className="topbuttons">
                <Button className="btn btn-secondary" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} disabled={!question.answered}>
                    {index === TOTAL_QUESTIONS - 1 ? "Submit" : "Next"}
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