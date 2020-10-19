import React from 'react'
import { Route } from "react-router-dom"

import "./groups-container.styles.css"
import Chat from '../chat/chat.component'
import Groups from "../../components/groups/groups.component"

export default function GroupsContainer({ match }) {
    return (
        <div>
            <Route exact path={match.path} component={Groups} />
            <Route path={`${match.path}/:groupId`} component={Chat} />
        </div>
    )
}
