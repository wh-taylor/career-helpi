import { Form } from 'react-bootstrap';
import './MultipleChoice.css';
import { useState } from 'react';

export function MultipleChoice() {
    const [answer, setAnswer] = useState<string>("");
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        setAnswer(event.target.value);
    }
    return (
    <div className="answers">
        <Form.Check 
        type = "radio"
        name = "answers"
        onChange = {changeAnswer}
        label = "True"
        value = "True"
        checked = {answer === "True"}
        className="radioButtons"
        />
        <Form.Check 
        type = "radio"
        name = "answers"
        onChange = {changeAnswer}
        label = "False"
        value = "False"
        checked = {answer === "False"}
        className="radioButtons"
        />
    </div>
    )
}

export default MultipleChoice;