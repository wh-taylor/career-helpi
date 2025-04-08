import { Button } from "react-bootstrap";

interface CareerCardProps {
    title: string,
    desc: string,
    reason: string,
}

export function CareerCard({title, desc, reason}: CareerCardProps) {
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
                <Button>Explore</Button>
            </div>
        </div>
    );
}