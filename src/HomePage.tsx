import { Button } from "react-bootstrap";

interface HomePageProps {
    setPage: (newPage: string) => void
}

export function HomePage({setPage}: HomePageProps) {
    return (
        <div>
            <Button onClick={() => setPage("BasicQuiz")}>Basic Quiz</Button>
        </div>
    )
}

export default HomePage;