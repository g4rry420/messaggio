import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component"
import Homepage from "./pages/homepage/homepage.component"
import LoginOrSignUp from './pages/loginOrSignup/loginOrSignup.component';
import GroupsContainer from "./pages/groups-container/groups-container.component";
import CreateGroup from './pages/create-group/create-group.component';

function App() {
  return (
    <div className="App container">
      <Header/>
      <div className="main-center-container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/loginorsignup" component={LoginOrSignUp} />
          <Route path="/groups" component={GroupsContainer} />
          <Route path="/creategroup" component={CreateGroup} />
        </Switch>
      </div>
    </div>
  );
}

export default App;