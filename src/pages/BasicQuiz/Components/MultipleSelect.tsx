import { Form } from 'react-bootstrap';
import './MultipleChoice.css';
import { useState } from 'react';

interface MultipleSelectProps {
    index: number;
    options: string[];
}

export function MultipleSelect({index, options}: MultipleSelectProps) {
    const [answers, setAnswer] = useState<string[]>([]);
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            if (answers.length === 2) return;
            setAnswer([...answers, value]);
        } else {
            setAnswer(answers.filter((item) => item !== value));
        }
    }
    return (
        <div className="answers">
            {options.map((option) => (<Form.Check 
                type = "checkbox"
                name = "answers"
                onChange = {changeAnswer}
                label = {option}
                value = {option}
                checked = {answers.includes(option)}
                className="radioButtons"
            />))}
        </div>
    );
}

export default MultipleSelect;