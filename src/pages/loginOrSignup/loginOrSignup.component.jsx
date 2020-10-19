import React,{ useState } from 'react'

import "./loginOrSignup.styles.css"
import Login from "../../components/login/login.component"
import SignUp from "../../components/signup/signup.componet"

export default function LoginOrSignUp() {
    const [displayLogin, setDisplayLogin] = useState(true);
    return (
        <div className="container-fluid">
        {
            displayLogin ? <Login setDisplayLogin={setDisplayLogin} displayLogin={displayLogin} /> :
                   <SignUp setDisplayLogin={setDisplayLogin} displayLogin={displayLogin} />
        }
        </div>  
    )
}
