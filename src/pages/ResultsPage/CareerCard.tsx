import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

export interface CareerCardProps {
  title: string;
  desc: string;
  reason: string;
  salaryRange: string;
  jobOutlook: string;
  commonEmployers: string;
}

export function CareerCard({title, desc, reason, salaryRange, jobOutlook, commonEmployers}: CareerCardProps) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
    <div className="career">
        <div className="jobTitle">{title}</div>
        <hr />
            <div className="jobReason">{reason}</div>
        <hr />
            <div className="exploreButton">
                <Button onClick={handleShow}>Explore</Button>
            </div>
        <Modal className="popup" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><strong>Description:</strong> {desc}</p>
            <p><strong>Salary Range:</strong> {salaryRange}</p>
            <p><strong>Job Outlook:</strong> {jobOutlook}</p>
            <p><strong>Common Employers:</strong> {commonEmployers}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
        </Modal>
    </div>
  );
}