import React,{ useContext, useEffect, useRef } from 'react'
import { Link, withRouter } from "react-router-dom"

import "./header.styles.css"
import { auth } from "../../firebase/firebase.utils"
import { MainContext } from "../../context/main-context"

const Header = (props) => {
    const { currentUser } = useContext(MainContext);

    const navLinkRef = useRef();

    useEffect(() => {
        if(!navLinkRef.current) return;

        for (let index = 0; index < navLinkRef.current.childNodes.length; index++) {
            const element = navLinkRef.current.childNodes[index];
            
            if(element.pathname === props.location.pathname){
                if(!element.children[0]) return;
                element.children[0].classList.add("active-header");
            }else{
                if(!element.children[0]) return;
                element.children[0].classList.remove("active-header");
            }
        }
    }, [props.location.pathname])

    return (
        <div className="container-fluid main-top-container pt-3">
            <h1 className="display-4 text-center">Messaggio</h1>
            <nav ref={navLinkRef} className="channel-container text-center py-4">
                {
                    currentUser ? (
                        <>
                        <Link  to="/chats"><button className="btn btn-channel">Chats</button></Link>
                        <Link  to="/groups"><button className="btn btn-channel">Groups</button></Link>
                        <Link to="/creategroup"><button className="btn btn-channel">Create Group</button></Link>
                        <button onClick={() => auth.signOut()} className="btn btn-channel">LogOut</button>
                        </>
                    )
                        : 
                        <Link  to="/loginorsignup"><button className="btn btn-channel">LogIn</button></Link>
                }
            </nav>
        </div>
    )
}

export default withRouter(Header)