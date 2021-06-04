import React from "react";
import { Link } from "react-router-dom";
import "./TopBar.css"

const TopBar: React.FC = () => {
    return (
        <nav className="TopBar">
            <Link to="/" className="TopBar__link">All apps</Link>
        </nav>
    )
}

export default TopBar
