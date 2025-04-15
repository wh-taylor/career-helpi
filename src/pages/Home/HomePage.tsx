import { Button, } from "react-bootstrap";
import './HomePage.css';
import planet1Img from '../../planet1.png';
import planet2Img from '../../planet2.png';

interface HomePageProps {
    setPage: (newPage: string) => void
}

export function HomePage({setPage}: HomePageProps) {
    return (
        <div className="main-container">
            <div className="quiz-container">
                <div className="tagline">
                Explore the stars of possibility with The Career Cosmos...
                </div>
                <div className="quizzes">
                    <div className="quiz-box">
                        <div className="quiz-title">Basic Quiz</div>
                        <div className="quiz-description">
                        This is the description for the Basic Quiz.
                        </div>
                        <Button className="quiz-button" onClick={() => setPage("BasicQuiz")}>
                        <span>Basic Quiz</span>
                        </Button>
                        <img src={planet1Img} alt="red-planet" className="planet" />
                    </div>
                    <div className="quiz-box">
                        <div className="quiz-title">Detailed Quiz</div>
                        <img src={planet2Img} alt="blue-planet" className="planet" />
                        <div className="quiz-description">
                        This is the description for the Detailed Quiz.
                        </div>
                        <Button className="quiz-button" onClick={() => setPage("DetailedQuiz")}>
                        <span>Detailed Quiz</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;