import React,{ useContext } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component"
import ChatsContainer from "./pages/chats-container/chats-container.component"
import LoginOrSignUp from './pages/loginOrSignup/loginOrSignup.component';
import GroupsContainer from "./pages/groups-container/groups-container.component";
import CreateGroup from './pages/create-group/create-group.component';
import { MainContext } from './context/main-context';

function App() {
  const { currentUser } = useContext(MainContext)
  return (
    <div className="App container">
      <Header/>
      <div className="main-center-container">
      {(!currentUser) && <Redirect to="/loginorsignup"/>}
        <Switch>
          <Route path="/chats" component={ChatsContainer} />
          <Route path="/loginorsignup" component={LoginOrSignUp} />
          <Route path="/groups" component={GroupsContainer} />
          <Route path="/creategroup" component={CreateGroup} />
        </Switch>
      </div>
    </div>
  );
}

export default App;