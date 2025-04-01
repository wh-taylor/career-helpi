import { Button, } from "react-bootstrap";
import './HomePage.css';

interface HomePageProps {
    setPage: (newPage: string) => void
}

export function HomePage({setPage}: HomePageProps) {
    return (
        <div className="quiz-container">
            <div className='quiz-box'>
                <div className="quiz-title">Basic Quiz</div>
                <div className="quiz-description">
                    This is the description for the Basic Quiz.
                </div>
                <Button className="quiz-button" onClick={() => setPage("BasicQuiz")}>Basic Quiz</Button>
            </div>
            <div className='quiz-box'>
                <div className="quiz-title">Detailed Quiz</div>
                <div className="quiz-description">
                    This is the description for the Detailed Quiz.
                </div>
                <Button className="quiz-button" onClick={() => setPage("DetailedQuiz")}>Detailed Quiz</Button>
            </div>
        </div>
    )
}

export default HomePage;