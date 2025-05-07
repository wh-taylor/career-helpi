import { Form } from 'react-bootstrap';
import './MultipleChoice.css';
import { useState } from 'react';
import { Response } from '../BasicQuiz';

interface MultipleChoiceProps {
    index: number;
    options: string[];
    onAnswer: (answer: Response) => void;
}

export function MultipleChoice({index, options, onAnswer}: MultipleChoiceProps) {
    const [answer, setAnswer] = useState<string>("");

    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        setAnswer(event.target.value);
        onAnswer(answer);
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