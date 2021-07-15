import React, { useState, useEffect } from "react";
import Canvas from "./Convas";

function Login (props) {

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    const handleSignupClick = () => {
        props.history.push("/signup")
    }

    const handleLogin = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {
            localStorage.token = user.token

            if(localStorage.token !== "undefined"){
                props.handleLoignUser(user.user)
                props.history.push('/homepage')
            }else {
                alert("Username or password is not correct")
            }
        })
    }

    return (
        <div className="login-page">
            <div className="switch"><h2>Sign up？</h2></div>
            <input type="checkbox" id="change" />
            <label  onClick={() => handleSignupClick()}>Sign up</label>
                <div className="login">
                    <form className="login" onSubmit={(e) => handleLogin(e)}>
                        <h1>My Place</h1>
                        <input type="text" value={username} placeholder="Please enter your username" onChange={(e) => setUsername(e.target.value)} /> 
                        <input type="password" value={password} placeholder="Please enter your password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="submit" className="btn" value="Login"/>
                    </form>
                </div>
                {
                Object.keys(props.loginUser).length === 0
                ?<Canvas/>
                :null
                }
        </div>
    ) 

}

export default Login;