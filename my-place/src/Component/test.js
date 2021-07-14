import React, { Component } from "react";
import NavBar from "./NavBar";
import { Upload, Input, Modal, Button } from 'antd'
import {  PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


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
        name: '',
        address: '',
        email: '',
        phone: '',
        zipCode: '',
        password: '',
        newPassword: '',
        fileList: [],
        upFiles: [], 
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
    }

   //change upload value
   onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

//   beforeUploadFile = (file) => {
//     const {upFiles} = this.state;
//     upFiles.push(file);
//     this.setState({upFiles: upFiles});

//   }

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

  //handle submit upload
  handleSubmit = () => {
    const {fileList} = this.state;
    let formData = new FormData();
    fileList.forEach((file) => {
      console.log(`file for each ${file} `)
      formData.append('img', file);
      formData.append('user_id', this.props.loginUser.id);
    });
    fetch("http://localhost:3000/userimage", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(() => {
    })
    this.setState({
      fileList: [],
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

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }


    render() {
        console.log(this.props.loginUser)
        console.log(this.state.about)
        console.log(this.state.fileList)
        const phoneformat =  `(${this.props.loginUser.phone.slice(0, 3)}) ${this.props.loginUser.phone.slice(3, 6)}-${this.props.loginUser.phone.slice(6, 10)}`
        const { name, address, email, phone, zipCode, password, newPassword, previewVisible, previewImage, fileList, previewTitle, upFiles} = this.state

        return(
            <div>
                 {
                 Object.keys(this.props.loginUser).length > 0
                 ?<div>
                     <div className="profile-page-header"></div>
                    <NavBar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic}/>
                    <div className="sub-nav">
                        <ul>
                            <li onClick={() => this.handleAbout()}>About</li>
                            <li onClick={() => this.handleEdit()}>Edit Profile</li>
                            <li onClick={() => this.handleRest()}>Change Password</li>
                        </ul>
                    </div>

                    {this.state.about
                    ?<div className="about">
                        <div>Name: { this.props.loginUser.name }</div>
                        <div>Phone: { phoneformat }</div>
                        <div>Email: { this.props.loginUser.email }</div>
                        <div>Address: { this.props.loginUser.address }</div>
                        <div>Zip Code: { this.props.loginUser.post_code }</div>
                    </div>
                    :null
                    }
                    {this.state.edit
                        ?<div className="profile-page-upload">
                            <ImgCrop rotate >
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    beforeUpload={ file => {
                                        upFiles.push(file);
                                        this.setState({upFiles: upFiles})
                                    }}
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
                            </ImgCrop>
                            <Button style={{marginTop: '10px'}} onClick={() => this.handleSubmit()} type='primary' >submit</Button>
                            <form className="edit">
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Name: "
                                value={name}
                                onChange={(e) => this.handleNameOnchange(e)}    
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Address: "
                                value={address}
                                onChange={(e) => this.handleAddressOnchange(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Email: "
                                value={email}
                                onChange={(e) => this.handleEmailOnchange(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Phone: "
                                value={phone}
                                onChange={(e) => this.handlePhoneOnchange(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Zip Code: "
                                value={zipCode}
                                onChange={(e) => this.handleZipCodeOnchange(e)}
                                >
                                </Input>
                            </form>
                        </div> 
                        :null 
                    }
                    {this.state.reset
                        ? <form>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="New password: "
                                value={password}
                                onChange={(e) => this.handlePassword(e)}
                                >
                                </Input>
                                <Input
                                style={{width: '400px'}}
                                addonBefore="Confirm Password: "
                                value={newPassword}
                                onChange={(e) => this.handleNewPassword(e)}
                                >
                                </Input>

                        </form>
                        :null
                    }    
                 </div>
                 :this.props.history.push('/')
                }
            </div>
        )
    }
}