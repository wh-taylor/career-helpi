import { Form } from 'react-bootstrap';
import './MultipleChoice.css';
import { useState } from 'react';

interface MultipleChoiceProps {
    index: number;
    options: string[];
}

export function MultipleChoice({index, options}: MultipleChoiceProps) {
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
        label = {options[0]}
        value = {options[0]}
        checked = {answer === "True"}
        className="radioButtons"
        />
        <Form.Check 
        type = "radio"
        name = "answers"
        onChange = {changeAnswer}
        label = {options[1]}
        value = {options[1]}
        checked = {answer === "False"}
        className="radioButtons"
        />
    </div>
    )
}

export default MultipleChoice;