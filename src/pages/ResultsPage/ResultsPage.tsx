import { CareerCard } from "./CareerCard";

import { QuizResult } from "../../App";
import './ResultsPage.css';

interface ResultsPageProps {
    setPage: (newPage: string) => void;
    quizResults: QuizResult[];
}


export function ResultsPage({setPage, quizResults}: ResultsPageProps) {

    return (
        <div className="main-container">
            <h1 className="resultsHeader">Here are our top career choices for you:</h1>
            <hr/>
            <div className="careerCards">
                {quizResults.map((result, index) =>
                    
                    <CareerCard
                        title={result.title}
                        desc={result.description}
                        reason={result.reason}
                        salaryRange={result.salaryRange}
                        jobOutlook={result.jobOutlook}
                        commonEmployers={result.commonEmployers}
                        key={index}/>
                    
                )}
            </div>
        </div>
    )
}

export default ResultsPage;