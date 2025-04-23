import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

interface CareerCardProps {
    title: string,
    desc: string,
    reason: string,
}

export function CareerCard({title, desc, reason}: CareerCardProps) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className="career">
            <div className="jobTitle">
                {title}
            </div>
            <div className="jobDesc">
                {desc}
            </div>
            <hr/>
            <div className="jobReason">
                {reason}
            </div>
            <div className="exploreButton">
                <Button onClick={handleShow}>Explore</Button>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This is where the career description can go
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}