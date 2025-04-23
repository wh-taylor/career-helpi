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
            {options.map((option) => (<Form.Check 
                type = "radio"
                name = "answers"
                onChange = {changeAnswer}
                label = {option}
                value = {option}
                checked = {answer === option}
                className="radioButtons"
            />))}
        </div>
    );
}

export default MultipleChoice;