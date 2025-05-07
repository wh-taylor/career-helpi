import { Form } from 'react-bootstrap';
import './Slider.css';
import { useState } from 'react';
import { Response } from '../BasicQuiz';

interface SliderProps {
    index: number;
    options: string[];
    onAnswer: (answer: Response) => void;
}

export function Slider({index, options, onAnswer}: SliderProps) {
    const [rating, setRating] = useState<number>(3);

    function changeRating(event: React.ChangeEvent<HTMLInputElement>) {
        setRating(parseInt(event.target.value));
        onAnswer(rating);
    };

    return(
        <div className="slider-answers">
            <Form.Range 
                className="slider"
                min={1}
                max={5}
                step={1}
                value={rating}
                onChange={changeRating}
            />
            <div className="numberOptions">
                {options.map((x) => <p>{x}</p>)}
            </div>
        </div>
    )
}

export default Slider;