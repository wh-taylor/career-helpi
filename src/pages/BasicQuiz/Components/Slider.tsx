import { Form } from 'react-bootstrap';
import './Slider.css';
import { useState } from 'react';

interface SliderProps {
    index: number;
    options: string[];
}

export function Slider({index, options}: SliderProps) {
    return(
    <div className="answers">
        <Form.Range 
            className="slider"
            min={1}
            max={5}
            step={1}
        />
        <div className="numberOptions">
            {options.map((x) => <p>{x}</p>)}
        </div>
        
    </div>
    )
}

export default Slider;