import { Link } from "react-router-dom";
import "../index.css"

export default function Header() {
    return (
        <header>
            <legend>Jack.dev</legend>

            <nav>
                <Link to="/">Myself</Link>
                <Link to="/projects">GitHub</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}