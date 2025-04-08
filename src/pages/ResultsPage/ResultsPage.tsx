import { useState } from "react";
import { Button } from "react-bootstrap";
import './ResultsPage.css';

interface ResultsPageProps {
    setPage: (newPage: string) => void
}

export function ResultsPage({setPage}: ResultsPageProps) {
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="main-container">
            <div className="careerCards">
                <div className="career">
                    <div className="jobTitle">
                        Job Title
                    </div>
                    <div className="jobDesc">
                        This is a brief description for the given career.
                    </div>
                    <hr/>
                    <div className="jobReason">
                        Here is my opinion on why I think this is a good fit for you.
                    </div>
                </div>
                <div className="career">
                    <div className="jobTitle">
                        Job Title
                    </div>
                    <div className="jobDesc">
                        This is a brief description for the given career.
                    </div>
                    <hr/>
                    <div className="jobReason">
                        Here is my opinion on why I think this is a good fit for you.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsPage;