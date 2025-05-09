import { CareerCard } from "./CareerCard";
import './ResultsPage.css';
import { getApiKey, generateNewDetailedQuestion } from '../../openai';

interface ResultsPageProps {
    setPage: (newPage: string) => void
}

interface Card {
    title: string,
    desc: string,
    reason: string,
}

export function ResultsPage({setPage}: ResultsPageProps) {
    let cards: Card[] = [
        {title: "Job 1", desc: "Desc", reason: "Reason"},
        {title: "Job 2", desc: "Desc", reason: "Reason"},
        {title: "Job 3", desc: "Desc", reason: "Reason"},
        {title: "Job 4", desc: "Desc", reason: "Reason"},
        {title: "Job 5", desc: "Desc", reason: "Reason"},
    ];

    return (
        <div className="main-container">
            <h1 className="resultsHeader">Here are our top career choices for you:</h1>
            <hr/>
            <div className="careerCards">
                {cards.map(({title, desc, reason}) =>
                    <CareerCard
                        title={title}
                        desc={desc}
                        reason={reason}/>
                )}
            </div>
        </div>
    )
}

export default ResultsPage;