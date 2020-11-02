import React,{ useContext, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component"
import { MainContext } from './context/main-context';
import ErrorBoundary from "./components/error-boundary/error-boundary.component"
import Spinner from "./components/spinner/spinner.component"


const ChatsContainer = lazy(() => import("./pages/chats-container/chats-container.component"));
const LoginOrSignUp = lazy(() => import("./pages/loginOrSignup/loginOrSignup.component"));
const GroupsContainer = lazy(() => import("./pages/groups-container/groups-container.component"));
const CreateGroup = lazy(() => import("./pages/create-group/create-group.component"));

function App() {
  const { currentUser } = useContext(MainContext);

  return (
    <div className="App container">
        {!currentUser && <Redirect to="/loginorsignup" />}
        <Header/>
        <div className="main-center-container">
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Switch>
                <Route path="/chats" component={ChatsContainer} />
                <Route path="/loginorsignup" component={LoginOrSignUp} />
                <Route path="/groups" component={GroupsContainer} />
                <Route path="/creategroup" component={CreateGroup} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </div>
    </div>
  );
}

export default App;