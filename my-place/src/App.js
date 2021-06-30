import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {useRef, useState, useEffect } from 'react';
import Login from './Component/Login'
import HomePage from './Component/HomePage'
import Journal from './Component/Journal'
import JournalEdit from './Component/Container/JouranlEdit';
import SignUp from './Component/SignUp'



function App() {
  const [loginUser, setLoginUser] = useState({})

  const HandleLoignUser = (LoginUserObj) => {
    setLoginUser(LoginUserObj)
  }


  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/" component={(props) => (
        <Login {...props} HandleLoignUser={HandleLoignUser} loginUser={loginUser}/> 
        )} 
        />
      <Route exact path="/signup" component={(props) => (
        <SignUp {...props} /> 
        )} 
        />
      <Route exact path="/homepage" component={(props) => (
        <HomePage {...props} loginUser={loginUser} /> 
        )} 
        />

      <Route exact path="/journal" component={(props) => (
        <Journal {...props} loginUser={loginUser}/> 
        )} 
        />

      <Route exact path="/journaledit" component={(props) => (
        <JournalEdit {...props} /> 
        )} 
        />  

      </Switch>
    </div>
    </Router>
  );
}

export default App;
