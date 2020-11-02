import React,{ useContext, lazy, Suspense } from 'react'
import { Route, Redirect } from "react-router-dom"

import "./groups-container.styles.css"
import { MainContext } from "../../context/main-context"
import Spinner from "../../components/spinner/spinner.component"


const Groups = lazy(() => import("../../components/groups/groups.component"));
const GroupChat = lazy(() => import("../group-chat/group-chat.component"));

export default function GroupsContainer({ match }) {

    const { currentUser } = useContext(MainContext)

    if(!currentUser) return <Redirect to="/loginorsignup" />

    return (
        <div>
            <Suspense fallback={<Spinner/>}>
                <Route exact path={match.path} component={Groups} />
                <Route path={`${match.path}/:groupId`} component={GroupChat} />
            </Suspense>
        </div>
    )
}
