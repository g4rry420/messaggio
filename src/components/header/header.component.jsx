import React from 'react'
import { Link } from "react-router-dom"

import "./header.styles.css"

export default function Header() {
    return (
        <div className="container-fluid main-top-container pb-5 pt-3">
            <h1 className="display-4 text-center">Messaggio</h1>
            <nav className="channel-container text-center py-4">
                <Link  to="/"><button className="btn btn-channel">Homepage</button></Link>
                <Link><button className="btn btn-channel">Create Channel</button></Link>
                <Link  to="/loginorsignup"><button className="btn btn-channel">LogIn</button></Link>
            </nav>
        </div>
    )
}
