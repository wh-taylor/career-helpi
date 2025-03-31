import { Button, Container, Row, Col } from "react-bootstrap";

interface HomePageProps {
    setPage: (newPage: string) => void
}

export function HomePage({setPage}: HomePageProps) {
    return (
        <Container>
            <Row>
                <Col>
                    <Button onClick={() => setPage("BasicQuiz")}>Basic Quiz</Button>
                </Col>
                <Col>
                    <Button onClick={() => setPage("DetailedQuiz")}>Detailed Quiz</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default HomePage;