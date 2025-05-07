import { Form } from 'react-bootstrap';
import './MultipleSelect.css';
import { useState } from 'react';
import { Response } from '../BasicQuiz';

interface MultipleSelectProps {
    index: number;
    options: string[];
    onAnswer: (answer: Response) => void;
}

export function MultipleSelect({index, options, onAnswer}: MultipleSelectProps) {
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
        onAnswer(answers);
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
                className="checkButtons"
            />))}
        </div>
    );
}

export default MultipleSelect;