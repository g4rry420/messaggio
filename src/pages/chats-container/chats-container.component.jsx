import React,{ useContext } from 'react'
import { Route,Redirect } from "react-router-dom"

import "./chats-container.styles.css"
import Chats from "../../components/chats/chats.component"
import IndividualUser from "../individual-user/individual-user.component"
import { MainContext } from "../../context/main-context"

export default function ChatsContainer({ match }) {

    const { currentUser } = useContext(MainContext)

    if(!currentUser) return <Redirect to="/loginorsignup" />
    return (
        <div>
            <Route exact path={match.path} component={Chats} />
            <Route exact path={`${match.path}/:userId`} component={IndividualUser} />
        </div>
    )
}
