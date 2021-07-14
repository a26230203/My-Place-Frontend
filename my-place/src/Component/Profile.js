import React, { Component } from "react";
import { Upload, Input, Modal, Button, message } from 'antd'
import {  PlusOutlined } from '@ant-design/icons';
import { BsPeopleCircle } from "react-icons/bs";
import { GiSmartphone ,GiModernCity } from "react-icons/gi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { RiLock2Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import ImgCrop from 'antd-img-crop';
import NavBar from "./NavBar";


function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


export default class Profile extends Component{ 
    state = {
        about: true,
        edit: false,
        reset: false,
        name: this.props.loginUser.name,
        address: this.props.loginUser.address,
        email: this.props.loginUser.email,
        phone: this.props.loginUser.phone,
        zipCode: this.props.loginUser.post_code,
        newpassword: '',
        confirmPassword: '',
        viewPassword: false,
        fileList: [],
        upFiles: [], 
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        users: [],
        photos: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(users => {
            const userArr = users.filter(user => user.id === this.props.loginUser.id)
            this.setState({users: userArr})
        })
        fetch("http://localhost:3000/photos")
        .then(res => res.json())
        .then(photos => this.setState({photos}))
    }

   //change upload value
   onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  beforeUploadFile = (file) => {
    const {upFiles} = this.state;
    upFiles.push(file);
    this.setState({upFiles: upFiles});

  }

  //handle Onchange of upload
  handleChange = ({ fileList }) => this.setState({ fileList });

  //handle cancel of upload
  handleCancel = () => this.setState({ previewVisible: false });

  //handle preview of uploadalbumName
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleViewPassword = () => {
      this.setState({
        viewPassword: !this.state.viewPassword
      })
  }

  //handle submit upload
  handleSubmit = () => {
    const {upFiles} = this.state;
    let formData = new FormData();
    upFiles.forEach((file) => {
      formData.append('img', file);
    });
    fetch(`http://localhost:3000/users/${this.props.loginUser.id}`, {
      method: "PATCH",
      body: formData
    })
    .then(res => res.json())
    .then(() => {
        message.success('Photo is uploaded')
    })
    this.setState({
      upFiles: [],
      fileList: []
    })
} 


handleFormSubmit = () => {
    const {name, address, email, phone, zipCode, users} = this.state

    fetch(`http://localhost:3000/users/${this.props.loginUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            address: address,
            email: email,
            phone: phone,
            zipCode: zipCode,
        }),
    })
    .then(res => {
        message.success('Info is Submited')
        this.componentDidMount()
    })
} 


handleResetPassowrd = () => {
    const {newpassword, confirmPassword, name, address, email, phone, zipCode} = this.state

    if(newpassword === confirmPassword && newpassword !== '')
    fetch(`http://localhost:3000/users/${this.props.loginUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: newpassword,
            name: name,
            address: address,
            email: email,
            phone: phone,
            zipCode: zipCode,
        }),
    })
    .then(res => {
        message.success('Password is changed')
        this.componentDidMount()
        this.setState({
            newpassword: '',
            confirmPassword: ''
        })
    })
} 
    handleAbout = () => {
        this.setState({
            about: true,
            edit: false,
            reset: false
        })
    }

    handleEdit = () => {
        this.setState({
            about: false,
            edit: true,
            reset: false
        })
    }

    handleRest = () => {
        this.setState({
            about: false,
            edit: false,
            reset: true
        })
    }


    handleNameOnchange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleAddressOnchange = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    
    handleEmailOnchange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePhoneOnchange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    handleZipCodeOnchange = (e) => {
        this.setState({
            zipCode: e.target.value
        })
    }

    handleNewPassword = (e) => {
        this.setState({
            newpassword: e.target.value
        })
    }

    handleConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }



    render() {
        const { fileList, previewImage, previewTitle, previewVisible, users } = this.state
        const userPhoto = this.state.photos.filter(photo => photo.user_id === this.props.loginUser.id)
        console={users}
        return(
            <div>
                 {
                 Object.keys(this.props.loginUser).length > 0
                 ?<div className="profile-page">
                     <div className="profile-page-header">
                        {userPhoto.slice(-12).map(photo => {
                            const rotate = Math.floor(Math.random() * 40 - 20)
                            return <img
                                    key={photo.id}
                                    className="profile-page-header-img"
                                    key={photo.id}
                                    style={{transform: `rotate(${rotate}deg)`}}
                                    src={photo.image} 
                                    />
                            })
                        }
                     </div>
                    <NavBar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic}/>
                    <div className="sub-nav">
                            {users.map(user => {
                                if(user.img !== ''){
                                    return <img  key={user.id} className="sub-nav-img" src={user.img} />
                                             
                                }else{
                                    return <div></div>
                                } 
                                })
                            }
                            <li className="about-btn"  onClick={() => this.handleAbout()}>About</li>
                            <li className="edit" onClick={() => this.handleEdit()}>Edit Profile</li>
                            <li className="reset" onClick={() => this.handleRest()}>Change Password</li>  
                    </div>

                    {this.state.about
                    ?<div className="about">
                        {users.map(user => {
                           if(user.img !== ''){
                            return <img key={user.id} src={user.img} className="about-img" /> 
                           }else{
                            return <img src='https://tanzolymp.com/images/default-non-user-no-photo-1.jpg' /> 
                           } 
                        })
                        }
                        <div className="about-img-div"></div>
                        <div className="about-img-div-div"></div>
                        <div className="about-img-div-div-div"></div>
                            {users.map(user => {
                                return<div key={user.id}> 
                                    <div className="about-name" ><BsPeopleCircle style={{fontSize: '40', marginBottom: "5"}}/> { user.name.toUpperCase() }</div>
                                    <div className="about-icon">
                                        <div className="about-phone" > <GiSmartphone style={{fontSize: '24', marginBottom: "5"}} /> Phone: { users.map(user => `(${user.phone.slice(0, 3)}) ${user.phone.slice(3, 6)}-${user.phone.slice(6, 10)}`) }</div>
                                        <div className="about-email"> <HiOutlineMail style={{fontSize: '24', marginBottom: "5", marginRight: '5px'}} />Email: { user.email.toUpperCase() }</div>
                                        <div className="about-add"> <HiOutlineLocationMarker style={{fontSize: '24', marginBottom: "5", marginRight: '5px'}} />Address: { user.address.toUpperCase() }</div>
                                        <div className="about-zip"> <GiModernCity style={{fontSize: '24', marginBottom: "5", marginRight: '5px'}} /> Zip Code: { user.post_code }</div>
                                    </div>
                                </div>
                                })
                            }
                    </div>
                    :null
                    }
                    {this.state.edit
                        ?<div className="profile-page-upload">
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    beforeUpload={this.beforeUploadFile}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    multiple={false}
                                >
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8}}>Upload</div>
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={this.handleCancel}
                                    >
                                    <img
                                        src={previewImage}
                                        alt={previewTitle}
                                        style={{ width: '100%', height: '100%'}}
                                    />
                                </Modal>
                            <Button style={{marginTop: '10px'}} onClick={() => this.handleSubmit()} type='primary' >Upload</Button>
                            <div className="picture-card-div"></div>
                            <div className="edit" >
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Name: "
                                value={this.state.name}
                                prefix={<BsPeopleCircle style={{marginRight: '5px'}}/>}
                                onChange={(e) => this.handleNameOnchange(e)}    
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Address: "
                                value={this.state.address}
                                prefix={<GiSmartphone style={{marginRight: '5px'}}/>}
                                onChange={(e) => this.handleAddressOnchange(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Email: "
                                value={this.state.email}
                                prefix={<HiOutlineMail style={{marginRight: '5px'}}/>}
                                onChange={(e) => this.handleEmailOnchange(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Phone: "
                                value={this.state.phone}
                                prefix={<HiOutlineLocationMarker style={{marginRight: '5px'}}/>}
                                onChange={(e) => this.handlePhoneOnchange(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Zip Code: "
                                value={this.state.zipCode}
                                prefix={<GiModernCity style={{marginRight: '5px'}}/>}
                                onChange={(e) => this.handleZipCodeOnchange(e)}
                                >
                                </Input>
                                <Button style={{marginLeft: '150px',}}  type='primary'  onClick={() => this.handleFormSubmit()}>Submit</Button>
                            </div>
                        </div> 
                        :null 
                    }
                    {this.state.reset
                        ? <div className="rest-passowrd-page">
                                <Input
                                style={{width: '400px'}}
                                addonBefore="New password: "
                                value={this.state.newpassword}
                                prefix={<RiLock2Line style={{marginRight: '5px'}}/>}
                                onChange={(e) => this.handleNewPassword(e)}
                                type={this.state.viewPassword? "text" :"password"}
                                >
                                </Input>
                                <FiEye className="rest-view-password" onClick={() => this.handleViewPassword()}/>
                                <div className="rest-passowrd-warning">
                                <li className={this.state.newpassword.length >= 8? 'password-match' : 'password-not-match' }>Must contain 8 or more characters</li>
                                <li className={this.state.newpassword.match(/\d+/g) ? 'password-match' : 'password-not-match' }>Must contain a digit</li>
                                <li className={this.state.newpassword.match(/[a-z]/)? 'password-match' : 'password-not-match' }>Must contain a lower case character</li>
                                <li className={this.state.newpassword.match(/[A-Z]/)? 'password-match' : 'password-not-match' }>Must contain an upper case character</li>
                                </div>
                                <Input
                                style={{width: '400px', marginBottom: '10px'}}
                                addonBefore="Confirm Password: "
                                value={this.state.confirmPassword}
                                prefix={<RiLock2Line style={{marginRight: '5px'}}/>}
                                type={this.state.viewPassword? "text" :"password"}
                                onChange={(e) => this.handleConfirmPassword(e)}
                                >
                                </Input>
                                <FiEye className="rest-view-password" onClick={() => this.handleViewPassword()}/>
                                {this.state.newpassword !== this.state.confirmPassword
                                ? <p className="password-not-match">The Confirm password confirmation does not match</p>
                                : null
                                }
                                <div style={{height:'50px   '}}></div>
                                <Button style={{marginLeft: '10px', marginTop:"30px"}}  type='primary'  onClick={() => this.handleResetPassowrd()}>Submit</Button>
                        </div>
                        :null
                    }    
                 </div>
                 :this.props.history.push('/')
                }
            </div>
        )
    }
}