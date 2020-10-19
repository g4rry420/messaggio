import React,{ useContext } from 'react'
import { Link } from "react-router-dom"

import "./header.styles.css"
import { auth } from "../../firebase/firebase.utils"
import { MainContext } from "../../context/main-context"

export default function Header() {

    const { currentUser, headerDisplay } = useContext(MainContext);

    return (
        <div className="container-fluid main-top-container pt-3">
        {
            headerDisplay ? (
                <>
                    <h1 className="display-4 text-center">Messaggio</h1>
                    <nav className="channel-container text-center py-4">
                    <Link  to="/"><button className="btn btn-channel">Homepage</button></Link>
                    <Link  to="/groups"><button className="btn btn-channel">Groups</button></Link>
                    <Link to="/creategroup"><button className="btn btn-channel">Create Group</button></Link>
                    {
                        currentUser ? <button onClick={() => auth.signOut()} className="btn btn-channel">LogOut</button>
                            : 
                            <Link  to="/loginorsignup"><button className="btn btn-channel">LogIn</button></Link>
                    }
                    </nav>
                </>
            ) : null
        }
        </div>
    )
}