import React,{ useContext, lazy, Suspense } from 'react'
import { Route,Redirect } from "react-router-dom"

import "./chats-container.styles.css"
import { MainContext } from "../../context/main-context"
import Spinner from "../../components/spinner/spinner.component"

const Chats = lazy(() => import("../../components/chats/chats.component"));
const IndividualUser = lazy(() => import("../individual-user/individual-user.component"));

export default function ChatsContainer({ match }) {

    const { currentUser } = useContext(MainContext);

    if(!currentUser) return <Redirect to="/loginorsignup" />
    return (
        <div>
            <Suspense fallback={<Spinner/>}>
                <Route exact path={match.path} component={Chats} />
                <Route exact path={`${match.path}/:userId`} component={IndividualUser} />
            </Suspense>
        </div>
    )
}
