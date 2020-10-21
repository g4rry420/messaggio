import React,{ useContext } from 'react'
import { Route, Redirect } from "react-router-dom"

import "./groups-container.styles.css"
import Groups from "../../components/groups/groups.component"
import GroupChat from "../group-chat/group-chat.component"
import { MainContext } from "../../context/main-context"

export default function GroupsContainer({ match }) {

    const { currentUser } = useContext(MainContext)

    if(!currentUser) return <Redirect to="/loginorsignup" />

    return (
        <div>
            <Route exact path={match.path} component={Groups} />
            <Route path={`${match.path}/:groupId`} component={GroupChat} />
        </div>
    )
}
