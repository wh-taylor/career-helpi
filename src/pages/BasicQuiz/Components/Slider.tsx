import { Form } from 'react-bootstrap';
import './Slider.css';
import { useState } from 'react';

export function Slider() {
    return(
    <div className="answers">
        <Form.Range 
        className="slider"
        min={0}
        max={5}
        step={1}
        />
        <div className="numberOptions">
            <h1>0</h1>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>
        </div>
        
    </div>
    )
}

export default Slider;