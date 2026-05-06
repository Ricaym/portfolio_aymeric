import { Link } from "react-router-dom";
import "../index.css"

export default function Header() {
    return (
        <header>
            <legend>Aymeric Chassagne</legend>

            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/">Projets</Link>
                <Link to="/projects">GitHub</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}