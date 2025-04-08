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
            
        </div>
    )
}

export default ResultsPage;