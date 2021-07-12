import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from 'react';
import Login from './Component/Login'
import SignUp from './Component/SignUp'
import HomePage from './Component/HomePage'
import Journal from './Component/Journal'
import JournalEdit from './Component/Container/JouranlEdit';
import JournalDraft from './Component/Container/JournalDraft';
import JournalDetial from './Component/Container/JournalDetail'
import Photo from './Component/Photo';
import Album from './Component/Album';
import Note from './Component/Note';
import Music from './Component/Music';
import Test from './Component/test'



function App() {
  const [loginUser, setLoginUser] = useState({})
  const [currentJouranl, setCurrentJouranl] = useState({})
  const [hideMusic, SetHideMusic] = useState(true)
  const [view, setView] = useState(true)

  const handleLoignUser = (LoginUserObj) => {
    setLoginUser(LoginUserObj)
  }

  const handleCurrentJouranl = (jouranlObj) => {
    setCurrentJouranl(jouranlObj)
  }

  const handleViewHideMusic = () => {
    setView(!view)
    SetHideMusic(!hideMusic)
  }
  
  console.log(currentJouranl)

  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/" component={(props) => (
        <Login {...props} handleLoignUser={handleLoignUser} loginUser={loginUser}/> 
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
        <Journal {...props} loginUser={loginUser} handleCurrentJouranl={handleCurrentJouranl}/> 
        )} 
        />

      <Route exact path="/journaldraft" component={(props) => (
        <JournalDraft {...props} loginUser={loginUser} currentJouranl={currentJouranl} handleCurrentJouranl={handleCurrentJouranl}/> 
        )} 
        />
      <Route exact path="/journaldetail" component={(props) => (
        <JournalDetial {...props} loginUser={loginUser} currentJouranl={currentJouranl}/> 
        )} 
        />

      <Route exact path="/journaledit" component={(props) => (
        <JournalEdit {...props} currentJouranl={currentJouranl} loginUser={loginUser}/> 
        )} 
        />
      
      <Route exact path="/photo" component={(props) => (
        <Photo {...props}  loginUser={loginUser} handleViewHideMusic={handleViewHideMusic} view={view}/> 
        )} 
        />

      <Route exact path="/album" component={(props) => (
        <Album {...props}  loginUser={loginUser}/> 
        )} 
        />

      <Route exact path="note" component={(props) => (
        <Note {...props}  loginUser={loginUser}/> 
        )} 
        />


        <Route exact path="/test" component={(props) => (
        <Test /> 
        )}  
        />
 

      </Switch>
      {Object.keys(loginUser).length > 0 && hideMusic
        ?<Music loginUser={loginUser}/>
        :null}
    </div>
    </Router>
  );
}

export default App;
