import { Link } from "react-router-dom";

export default function Route(){
    return(
        <h1>
            Home
            <br/>
            <br/>
            <Link to="/awards">Awards</Link>
            <br/>
            <Link to="/bookChapters">Book Chapters</Link>
            <br/>
            <Link to="/journalPublications">Journal Publications</Link>
            <br/>
            <Link to="/conferencePapers">Select Conference Papers</Link>
            <br/>
            <Link to="/projects">Projects</Link>
        </h1>
    )
}