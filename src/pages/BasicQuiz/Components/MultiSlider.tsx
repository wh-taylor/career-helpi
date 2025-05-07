import { Form } from 'react-bootstrap';
import './Slider.css';
import { useState } from 'react';
import { Response } from '../BasicQuiz';

interface MultiSliderProps {
    index: number;
    options: string[];
    onAnswer: (answer: Response) => void;
}

export function MultiSlider({index, options, onAnswer}: MultiSliderProps) {
    const [ratings, setRatings] = useState<number[]>(Array<number>(5).fill(3));

    function changeRating(i: number) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            let updatedRatings = [...ratings];
            updatedRatings[i] = parseInt(event.target.value);
            setRatings(updatedRatings);
            onAnswer(ratings);
        };
    }

    return(
        <div className="slider-answers">
            {options.map((x, i) => <>
                <p>{x}</p>
                <Form.Range 
                    className="slider"
                    min={1}
                    max={5}
                    step={1}
                    value={ratings[i]}
                    onChange={changeRating(i)}
                />
                <div className="numberOptions">
                    <p>1</p>
                    <p>5</p>
                </div>
            </>)}
        </div>
    )
}

export default MultiSlider;