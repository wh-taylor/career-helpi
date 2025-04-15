import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './BasicQuiz.css';
import MultipleChoice from "./Components/MultipleChoice";
import Slider from "./Components/Slider";
import Dropdown from "./Components/Dropdown";
import rocketImg from '../rocket.png';


interface BasicQuizProps {
    setPage: (newPage: string) => void
}

type QuestionType = "MultipleChoice" | "Slider" | "Dropdown";

interface Question {
    id: number;
    name: string;
    body: string;
    options: string[];
    type: QuestionType;
}

const basicQuestions: Question[] = [
    {id: 1, name: "Question 1", body: "What is your preferred situation?", options: ["True", "False"], type: "MultipleChoice"},
    {id: 2, name: "Question 2", body: "Rate how you feel working on this:", options: ["", ""], type: "Slider"},
    {id: 3, name: "Question 3", body: "You like working in a team", options: ["True", "False"], type: "Dropdown"}
];


export function BasicQuiz({setPage}: BasicQuizProps) {
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="main-container">
            <h1 className="header">Basic Quiz</h1>
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
                    } else{
                        setPage("ResultsPage")
                    }
                }}>
                    {index === basicQuestions.length -1 ? "Submit" : "Next"}
                </Button>
            </div>
            <div className="content">
                <div className="question">
                    <p>{basicQuestions[index].body}</p>
                </div>
            </div>
            {basicQuestions[index].type === "MultipleChoice" && <MultipleChoice index= {index} options={{...basicQuestions[index].options}}/>}
            {basicQuestions[index].type === "Slider" && <Slider/>}
            {basicQuestions[index].type === "Dropdown" && <Dropdown/>}

            <div className="progressbarcontainer">
                <ProgressBar now={((index) / basicQuestions.length)*100} className="custom-progressbar" variant="danger" label={<img className="progress-label"src={rocketImg} alt=""/>}/>
            </div>

        </div>
    )
}

export default BasicQuiz;