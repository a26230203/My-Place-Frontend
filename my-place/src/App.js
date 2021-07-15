import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from 'react';
import Login from './Component/Login'
import SignUp from './Component/SignUp'
import HomePage from './Component/HomePage'
import NavBar from './Component/NavBar';
import Journal from './Component/Journal'
import JournalEdit from './Component/Container/JouranlEdit';
import JournalDraft from './Component/Container/JournalDraft';
import JournalDetial from './Component/Container/JournalDetail'
import Photo from './Component/Photo';
import Album from './Component/Album';
import Music from './Component/Music';
import Notes from './Component/Notes';
import Profile from './Component/Profile';
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

  const handlehideMusic = (boolean) => {
    SetHideMusic(boolean)
  }
  
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
        <HomePage {...props} loginUser={loginUser} handlehideMusic={handlehideMusic} handleLoignUser={handleLoignUser}/> 
        )} 
        />

      <Route exact path="/journal" component={(props) => (
        <Journal {...props} loginUser={loginUser} handleCurrentJouranl={handleCurrentJouranl} handlehideMusic={handlehideMusic} handleLoignUser={handleLoignUser}/> 
        )} 
        />

      <Route exact path="/journaldraft" component={(props) => (
        <JournalDraft {...props} loginUser={loginUser} currentJouranl={currentJouranl} handleCurrentJouranl={handleCurrentJouranl} handlehideMusic={handlehideMusic}
        handleLoignUser={handleLoignUser}/> 
        )} 
        />
      <Route exact path="/journaldetail" component={(props) => (
        <JournalDetial {...props} loginUser={loginUser} currentJouranl={currentJouranl} handlehideMusic={handlehideMusic}/> 
        )} 
        />

      <Route exact path="/journaledit" component={(props) => (
        <JournalEdit {...props} currentJouranl={currentJouranl} loginUser={loginUser} handlehideMusic={handlehideMusic}/> 
        )} 
        />
      
      <Route exact path="/photo" component={(props) => (
        <Photo {...props}  loginUser={loginUser} handleViewHideMusic={handleViewHideMusic} view={view} handlehideMusic={handlehideMusic} handleLoignUser={handleLoignUser}/> 
        )} 
        />

      <Route exact path="/album" component={(props) => (
        <Album {...props}  loginUser={loginUser} handlehideMusic={handlehideMusic} handleLoignUser={handleLoignUser}/> 
        )} 
        />

      <Route exact path="/notes" component={(props) => (
        <Notes {...props} loginUser={loginUser} handlehideMusic={handlehideMusic} handleLoignUser={handleLoignUser}/> 
        )} 
        />

      <Route exact path="/profile" component={(props) => (
        <Profile {...props} loginUser={loginUser} handlehideMusic={handlehideMusic} handleLoignUser={handleLoignUser} handleLoignUser={handleLoignUser}/> 
        )} 
        />


        <Route exact path="/test" component={(props) => (
        <Test /> 
        )}  
        />
 
      </Switch>
      {Object.keys(loginUser).length > 0 
        ?<Music loginUser={loginUser} hideMusic={hideMusic}/>
        :null}
    </div>
    </Router>
  );
}

export default App;
