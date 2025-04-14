import { Form } from 'react-bootstrap';
import './Dropdown.css';

export function Dropdown() {
    return(
    <div className="answers">
        <Form.Select
        className="dropdown"
        >
            <option>Choose Your Answer</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </Form.Select>
        
        
    </div>
    )
}

export default Dropdown;