import { Button } from "react-bootstrap";
import {useState} from "react";
import './HomePage.css';
import planet1Img from '../../planet1.png';
import planet2Img from '../../planet2.png';
import Alert from 'react-bootstrap/Alert';
import { getApiKey } from '../../openai'

interface HomePageProps {
    setPage: (newPage: string) => void
}

export function HomePage({setPage}: HomePageProps) {
    const [showAlert, setShowAlert] = useState(false);

    function handleQuizClick(page: string) {
        const apiKey = getApiKey();
        console.log("getApiKey():", apiKey);
        if (apiKey === null) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
            setPage(page);
        }
    }

    return (
        <div>
            {showAlert && (
                <div className="api_warning">
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        No API key found. Submit one again at the bottom of the page.
                    </Alert>
                </div>
            )}

            <div className="home-main-container">
            <div className="quiz-container">
                <div className="tagline">
                Explore the stars of possibility with The Career Cosmos...
                </div>
                <div className="quizzes">
                    <div className="quiz-box">
                        <div className="quiz-box-title-descrip">
                            <div className="quiz-title">Basic Quiz</div>
                            <div className="quiz-description">
                                Looking for a quick way to explore your interests? 
                                This multiple-choice quiz gives you a fast snapshot of career paths that might be a good fit—no rocket science required.
                            </div>
                        </div>
                        <Button className="quiz-button quiz-button1" onClick={() => handleQuizClick("BasicQuiz")}>
                        <span>Basic Quiz</span>
                        </Button>
                        <img src={planet1Img} alt="red-planet" className="planet" />
                    </div>
                    <div className="quiz-box">
                        <div className="quiz-box-title-descrip">
                            <div className="quiz-title">Detailed Quiz</div>
                            <div className="quiz-description">
                                Want something more personalized? This quiz gives you space to reflect and write about your goals, values, 
                                and passions—perfect for anyone ready to dig deeper.
                            </div>
                        </div>
                        <Button className="quiz-button quiz-button2" onClick={() => handleQuizClick("DetailedQuiz")}>
                        <span>Detailed Quiz</span>
                        </Button>
                        <img src={planet2Img} alt="blue-planet" className="planet" />
                    </div>
                </div>
            </div>
            </div>
        </div>

    )
}

export default HomePage;