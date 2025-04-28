import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import './BasicQuiz.css';
import MultipleChoice from "./Components/MultipleChoice";
import Slider from "./Components/Slider";
import Dropdown from "./Components/Dropdown";
import rocketImg from '../rocket.png';
import MultipleSelect from "./Components/MultipleSelect";


interface BasicQuizProps {
    setPage: (newPage: string) => void
}

type QuestionType = "MultipleChoice" | "Slider" | "Dropdown" | "MultiSlider" | "MultipleSelect";

interface Question {
    id: number;
    name: string;
    body: string;
    options: string[];
    type: QuestionType;
}

const basicQuestions: Question[] = [
    {id: 1, name: "Question 1", body: "What fills your tank? Rate how energizing each of these feels to you:", options: [
        "Deep problem-solving",
        "Helping someone through a tough time",
        "Creating something from nothing",
        "Organizing systems or tracking info",
        "Leading a group to a big win",
    ], type: "MultiSlider"},
    {id: 2, name: "Question 2", body: "Which of these 'workday vibes' is most you?", options: [
        "Flowing through creative projects in your own zone",
        "Digging into data or ideas, solving deep puzzles",
        "Talking with people, building trust and insight",
        "Pitching visions and rallying people to a cause",
        "Working with your hands, building or fixing things",
        "Keeping things efficient, organized, and precise",
    ], type: "MultipleChoice"},
    {id: 3, name: "Question 3", body: "What kind of team energizes you most?", options: [
        "A chill group of thoughtful problem-solvers",
        "Passionate creatives who build off each other's ideas",
        "Helpers who care deeply and work closely",
        "Competitive, ambitious go-getters",
        "Focused, task-oriented pros who respect structure",
        "No team, thanks — I prefer solo work",
    ], type: "MultipleChoice"},
    {id: 4, name: "Question 4", body: "How much structure do you prefer in your work?", options: [], type: "Slider"},
    {id: 5, name: "Question 5", body: "You feel most fulfilled when…", options: [
        "You've made someone's day better",
        "You've solved a tricky challenge",
        "You've created something others admire",
        "You've closed a deal or convinced someone",
        "You've completed everything efficiently",
        "You've fixed something broken",
    ], type: "MultipleChoice"},
    {id: 6, name: "Question 6", body: "Which workspace calls to you most?", options: [
        "A cabin with tools and hands-on materials",
        "A glassy office with a big whiteboard and team collab",
        "A cozy room full of books and conversations",
        "A personal creative studio with minimal interruptions",
        "A structured office with schedules, lists, and systems",
        "A lab or quiet environment with focus and depth",
    ], type: "MultipleChoice"},
    {id: 7, name: "Question 7", body: "Which of these titles feels most like you?", options: [
        "Builder",
        "Investigator",
        "Creator",
        "Helper",
        "Leader",
        "Organizer",
    ], type: "MultipleChoice"},
    {id: 8, name: "Question 8", body: "What kind of work do you most avoid?", options: [
        "Repetitive or rigid routines",
        "Emotional or sensitive interactions",
        "Complex abstract thinking",
        "Unstructured creative processes",
        "Leading or persuading others",
        "Physical or hands-on tasks",
    ], type: "MultipleChoice"},
    {id: 9, name: "Question 9", body: "Which would you rather do for a week?", options: [
        "Write, design, or make art for a new project",
        "Interview users and improve a system",
        "Help someone navigate a life challenge",
        "Pitch ideas to stakeholders and get buy-in",
        "Clean up a process and make it smooth",
        "Build something real with your hands",
    ], type: "MultipleChoice"},
    {id: 10, name: "Question 10", body: "How much people time do you want?", options: ["Mostly solo", "Talking to people all day"], type: "Slider"},
    {id: 11, name: "Question 11", body: "Which outcomes matter most to you? Pick 2:", options: [
        "Creating beauty or originality",
        "Solving complex problems",
        "Improving people's lives",
        "Making an impact at scale",
        "Bringing order or clarity",
        "Making something real and useful",
    ], type: "MultipleSelect"},
    {id: 12, name: "Question 12", body: "You imagine your ideal self as someone who…", options: [
        "Writes books or shares ideas",
        "Leads an organization or team",
        "Builds or repairs things that last",
        "Designs experiences or interfaces",
        "Cares for others in meaningful ways",
        "Brings structure and calm to chaos",
    ], type: "MultipleChoice"},
    {id: 13, name: "Question 13", body: "How do you prefer to work?", options: ["Slow, deliberate, reflective", "Fast, energetic, reactive"], type: "Slider"},
    {id: 14, name: "Question 14", body: "What job moment sounds most rewarding?", options: [
        "A client says, \"You really helped me.\"",
        "A user says, \"This design is amazing.\"",
        "A peer says, \"You cracked the impossible.\"",
        "A boss says, \"You made us money.\"",
        "A team says, \"You kept us organized.\"",
        "A friend says, \"You built that yourself?\"",
    ], type: "MultipleChoice"},
    {id: 15, name: "Question 15", body: "Which symbol feels most like your role in the world?", options: [
        "An artist shaping new experiences",
        "A solver piecing together the truth",
        "A caregiver offering peace and connection",
        "A spark that rallies others to action",
        "A builder making solid, useful things",
        "A librarian making sense of chaos",
    ], type: "MultipleChoice"},
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
                    if (index < basicQuestions.length-1) {
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
                {basicQuestions[index].type === "MultipleChoice" && <MultipleChoice index= {index} options={basicQuestions[index].options}/>}
                {basicQuestions[index].type === "Slider" && <Slider/>}
                {basicQuestions[index].type === "Dropdown" && <Dropdown/>}
                {basicQuestions[index].type === "MultipleSelect" && <MultipleSelect index= {index} options={basicQuestions[index].options}/>}
            </div>

            <div className="progressbarcontainer">
                <ProgressBar now={(index / basicQuestions.length)*100} className="custom-progressbar" variant="danger" label={<img className="progress-label"src={rocketImg} alt=""/>}/>
            </div>

        </div>
    )
}

export default BasicQuiz;