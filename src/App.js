import React,{ useContext } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component"
import ChatsContainer from "./pages/chats-container/chats-container.component"
import LoginOrSignUp from './pages/loginOrSignup/loginOrSignup.component';
import GroupsContainer from "./pages/groups-container/groups-container.component";
import CreateGroup from './pages/create-group/create-group.component';
import { MainContext } from './context/main-context';
import ErrorBoundary from "./components/error-boundary/error-boundary.component"

function App() {
  const { currentUser } = useContext(MainContext)
  return (
    <div className="App container">
        <Header/>
        {(!currentUser) && <Redirect to="/loginorsignup"/>}
        <div className="main-center-container">
          <ErrorBoundary>
            <Switch>
              <Route path="/chats" component={ChatsContainer} />
              <Route path="/loginorsignup" component={LoginOrSignUp} />
              <Route path="/groups" component={GroupsContainer} />
              <Route path="/creategroup" component={CreateGroup} />
            </Switch>
          </ErrorBoundary>
        </div>
    </div>
  );
}

export default App;