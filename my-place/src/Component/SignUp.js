import React, { useState } from 'react';
import {Input, Button, message } from 'antd'
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsPeopleCircle } from "react-icons/bs";
import { GiSmartphone ,GiModernCity } from "react-icons/gi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { RiLock2Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import defaultImage from '../static/png/noImage.jpg'

function SignUp(props) {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [viewPassword, setViewPassword] = useState(false)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [address, setAddress] = useState("")
    let [zipCode, setzipCode] = useState("")

    const handleViewPassword = () => {
        setViewPassword(!viewPassword)
    }

    const handleLoginBtn = () => {
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setzipCode('')
        setViewPassword(false)
        props.history.push('/')
    }

    const dataURItoBlob = (dataURI, type) => {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], { type: type });
        return bb;
    }

    let file = dataURItoBlob(defaultImage, 'image/png');

    const handleSingup = () => {
        if(username !== ''&& password !== '' && password === confirmPassword 
        && name !== '' && email !== '' && phone !== '' && address !== '' && zipCode !== '') {
            let formData = new FormData();
            formData.append('img', file);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('post_code', zipCode);
            fetch('http://localhost:3000/signup', {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(user => {
                localStorage.token = user.token
                if(localStorage.token !== "undefined"){
                    message.success("Successfuly created a Account")
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                    setName('')
                    setEmail('')
                    setPhone('')
                    setAddress('')
                    setzipCode('')
                    setViewPassword(false)
                    props.history.push('/')
                }else {
                    message.error("Please Try Again")
                }
            })
        }else {
            message.error('Please enter all info and try agin')
        }
    }

    return (
      <div className="singup">
        <div className="signup-form">
            <h1>Create My-Place account</h1>
            <FiEye className="rest-view-password" onClick={() => handleViewPassword()} style={{marginLeft: '510px', marginBottom: '-325px'}}/>
            <FiEye className="rest-view-password" onClick={() => handleViewPassword()} style={{marginLeft: '510px', marginBottom: '-580px'}}/>
        <Input 
        addonBefore="Username: "
        prefix={<AiOutlineUserAdd style={{marginRight: "5px"}}/>}
        value={username} 
        placeholder="Please enter your username" 
        onChange={(e) => setUsername(e.target.value)}
        >
        </Input>
        <Input 
        addonBefore="Password: "
        value={password}
        prefix={<RiLock2Line style={{marginRight: "5px"}}/>} 
        placeholder="Please enter your password" 
        onChange={(e) => setPassword(e.target.value)} 
        type={viewPassword? "text" :"password"}
        >
        </Input>
        <div className="signup-passowrd-warning">
        <li className={password.length >= 8? 'password-match' : 'password-not-match' }>Must contain 8 or more characters</li>
        <li className={password.match(/\d+/g) ? 'password-match' : 'password-not-match' }>Must contain a digit</li>
        <li className={password.match(/[a-z]/)? 'password-match' : 'password-not-match' }>Must contain a lower case character</li>
        <li className={password.match(/[A-Z]/)? 'password-match' : 'password-not-match' }>Must contain an upper case character</li>
        </div>
        <Input 
        addonBefore="Confirm Password: "
        value={confirmPassword}
        prefix={<RiLock2Line style={{marginRight: "5px"}}/>} 
        placeholder="Please enter your password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        type={viewPassword? "text" :"password"}
        >
        </Input>
        {password !== confirmPassword
        ? <p style={{marginTop: '-30px', marginBottom: '-5px'}} className="password-not-match">The Confirm password confirmation does not match</p>
        : null
        }
        <Input 
        addonBefore="Full Name: "
        type="text" value={name} 
        prefix={<BsPeopleCircle style={{marginRight: "5px"}}/>} 
        placeholder="Please enter your full name" 
        onChange={(e) => setName(e.target.value)}
        >

        </Input>
        <Input 
        addonBefore="Email: "
        type="text" 
        prefix={<HiOutlineMail style={{marginRight: "5px"}}/>} 
        value={email} 
        placeholder="Please enter your email" 
        onChange={(e) => setEmail(e.target.value)} 
        >

        </Input>
        <Input 
        addonBefore="Phone: "
        type="text"
        prefix={<GiSmartphone style={{marginRight: "5px"}}/>}  
        value={phone} 
        placeholder="Please enter your phone" 
        onChange={(e) => setPhone(e.target.value)}
        >

        </Input>
        <Input 
        addonBefore="Address: "
        type="text" value={address} 
        prefix={<HiOutlineLocationMarker style={{marginRight: "5px"}}/>}  
        placeholder="Please enter your address" 
        onChange={(e) => setAddress(e.target.value)}
        >

        </Input>
        <Input 
        addonBefore="Zip Code: "
        type="text"
        prefix={<GiModernCity style={{marginRight: "5px"}}/>}   
        value={zipCode} 
        placeholder="Please enter your zip code" 
        onChange={(e) => setzipCode(e.target.value)}
        >
        </Input>
        <Button type='primary' onClick={() => handleLoginBtn()} >Login</Button>
        <Button type='primary' onClick={() => handleSingup()}  style={{marginLeft: '200px'}}>SignUp</Button>
        </div>      
      </div>

    );
  }

  export default SignUp;