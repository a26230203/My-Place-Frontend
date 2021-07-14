import React, { useState } from 'react';


function SignUp(props) {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [address, setAddress] = useState("")
    let [zipCode, setzipCode] = useState("")

    const handleSingup = (e) => {
        e.preventDefault()
        const newUser = {
            username: username,
            password: password,
            name: name,
            email: email,
            phone: phone,
            address: address,
            post_code: zipCode
        }

        console.log(newUser)

        fetch('http://localhost:3000/signup', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(user => {
            localStorage.token = user.token

            
            if(localStorage.token !== "undefined"){
                alert("Successfuly created a Account")
                props.history.push('/')
            }else {
                alert("Please Try Again")
            }
        })
    }


    return (
      <div className="singup">
        <form className="signup-form" onSubmit={(e) => handleSingup(e)}>
            <h1>Create your account here</h1>
            <input type="text" value={username} placeholder="Please enter your username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} placeholder="Please enter your password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" value={name} placeholder="Please enter your name" onChange={(e) => setName(e.target.value)} />
            <input type="text" value={email} placeholder="Please enter your email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" value={phone} placeholder="Please enter your phone" onChange={(e) => setPhone(e.target.value)} />
            <input type="text" value={address} placeholder="Please enter your address" onChange={(e) => setAddress(e.target.value)} />
            <input type="text" value={zipCode} placeholder="Please enter your zip code" onChange={(e) => setzipCode(e.target.value)} />
            <input type="submit" className="btn" value="Sign up"/>
        </form>      
      </div>

    );
  }

  export default SignUp;