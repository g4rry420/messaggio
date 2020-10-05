import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component"
import Homepage from "./pages/homepage/homepage.component"
import LoginOrSignUp from './pages/loginOrSignup/loginOrSignup.component';

function App() {
  // https://www.applozic.com/resources/sidebox/css/app/images/mck-icon-group.png
  return (
    <div className="App container">
      <Header/>

      <div className="main-center-container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/loginorsignup" component={LoginOrSignUp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
