import React, {Component} from "react";
import { Card, Upload, Modal, Form, Button, Image, Input, Select, message, Switch   } from 'antd'
import {  PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { MdPhoto, MdPhotoAlbum} from "react-icons/md";
import Navbar from './NavBar'
import PhotoList from "./Container/PhotoList";
import Photo3D from './Container/Photo3D'
import { Translate } from "react-bootstrap-icons";

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Photo extends Component {

  state = {
    photos: [],
    album: [],
    display: true,
    albumForm: false,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [], 
    upFiles:[],
    albumName: '',
    }


    componentDidMount() {
      fetch("http://localhost:3000/photos")
      .then(res => res.json())
      .then(photos => this.setState({photos}))

      fetch("http://localhost:3000/albums")
      .then(res => res.json())
      .then(album => this.setState({album}))
    }

    //go to photo route
    handlClickPhoto = () => {
      this.props.history.push('/photo')
    }


    //go to album route
    handlClickAlbum = () => {
      this.props.history.push('/album')
    }

    // handle diplay photo list
    handleDisplay = () => {
      this.setState({
        display: !this.state.display
      })
    }

    //change upload value
    onChange = ({ target: { value } }) => {
      this.setState({ value });
    };

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

    beforeUpload = (file) => {
      const {upFiles} = this.state;
      upFiles.push(file);
      this.setState({upFiles: upFiles});
    }

    //handle submit upload
    handleSubmit = () => {
      const {upFiles} = this.state;
      let album_id = null;
      if(this.state.albumName !== "") {
        const findAlbum = this.state.album.find(album => album.name.toLowerCase() == this.state.albumName.toLowerCase())
        if(findAlbum === undefined) {
          message.info("Ablum is not exist, please creat a album")
        }else{
          album_id = findAlbum.id
          console.log(album_id)
        }
      }
      let formData = new FormData();
       upFiles.forEach((file) => {
        formData.append('image', file);
        formData.append('name', file.name);
        formData.append('user_id', this.props.loginUser.id);
        formData.append('album_id', album_id);
      })
      fetch("http://localhost:3000/photoupload", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(() => {
        this.componentDidMount()
        });
      this.setState({
        fileList: [],
        upFiles: []
      })
      this.handleDisplay()
  } 

   //Handle delete photo
   handleDelete =(photoObj) => {
    fetch(`http://localhost:3000/photos/${photoObj.id}`, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(() => {
        this.componentDidMount()
      })
    }

    //Handle albun name 
    handleAlbumName = (e) => {
        this.setState({
          albumName: e.target.value
        })
    }

    //Add photo to album
    AddPhotoToAlbum = (photoObj, albumId) => {
        if(albumId == "") {
          this.handleConfirm()
        }else{
            fetch(`http://localhost:3000/photos/${photoObj.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              album_id: albumId
            }),
          })
            .then(res => {
                message.success('Photo added to album');
            })
        }
    }

    //Display album form
    handleCreatalbum = () => {
      this.setState({
        albumForm : !this.state.albumForm
      })
    }

    //Create ablum
    handleConfirm = () => {
      const newAlbun ={
        name: this.state.albumName,
        user_id: this.props.loginUser.id
      }
      fetch("http://localhost:3000/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlbun),
      })
      .then(res => {
        message.success(' Album is created')
        this.handleCreatalbum()
        this.componentDidMount()
      })
    }

    handleVeiew = () => {
      this.props.handleViewHideMusic()
    }

    render() {
      const { previewVisible, previewImage, fileList, previewTitle } = this.state;
      const userPhoto = this.state.photos.filter(photo => photo.user_id === this.props.loginUser.id)
      return (
      <div className="photo-page">
        { Object.keys(this.props.loginUser).length > 0 
          ?<div>
            {this.props.view
              ?<div>
              <div className="photo-page-header"></div>
              <Navbar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic}/>
              <div className="photo-subdiv">
              <div className="photo-subnav">
                  <li className="photo-subnav-li" onClick={() => this.handlClickPhoto()}>
                  <MdPhoto style={{fontSize: 30  }}/>
                    Photos</li>
                  <li  className="photo-subnav-li" onClick={() => this.handlClickAlbum()}>
                  <MdPhotoAlbum style={{fontSize: 30  }}/>
                    Album</li>
              </div>
              <div className="photo-btn">
                <button className="photo-btn" onClick={() => this.handleDisplay()}>Upload Photo</button>
                <button className="photo-btn" onClick={() => this.handleCreatalbum()}>Create Album</button>
                <button className="switch" onClick={() => this.handleVeiew()}>3D View</button>
              </div>
              {this.state.albumForm
              ?<form>
                <div style={{marginBottom: '-30px', height: '100px'}}>
                <CloseCircleOutlined style={{marginTop: '50px', marginLeft: '550px', fontSize: '30px' }}onClick={() => this.handleCreatalbum()} />
                </div>
                <Input addonBefore="Album Title:" 
                style={{width: '400px', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}} 
                value={this.state.albumName}
                placeholder="Album name"
                onChange={(e) => this.handleAlbumName(e)}/>
                <Button style={{marginTop: '50px', marginRight: '10px'}} type="primary" shape="round" onClick={() => this.handleConfirm()}>Confirm</Button>
              </form>
              :null
            }
            </div>
              {this.state.display
                ?<div className="photo-page-list">
                      <Image.PreviewGroup>
                      {
                      userPhoto.map(photo => {
                            const rotate = Math.floor(Math.random() * 40 - 20)
                          return <Card style={{transform: `rotate(${rotate}deg)`}} className="photo-list-card">
                                    <PhotoList photo={photo} key={photo.id} handleDelete={this.handleDelete} album={this.state.album} 
                                    AddPhotoToAlbum={this.AddPhotoToAlbum}
                                    key={photo.id}/> 
                                </Card>
                        })
                      }
                      </Image.PreviewGroup>
                </div>
              :<Form >
              <Card className="photo-upload-card" title='Photo Upload' headStyle={{fontSize: '40px'}}>
                    <CloseCircleOutlined className="photo-upload-cancel" style={{fontSize: '40px'}} onClick={() => this.handleDisplay()}/>
                    <br/>
                    <Input addonBefore="Album Title:" 
                      style={{width: '400px', height: '100px'}} 
                      value={this.state.albumName}
                      placeholder="Option"
                      onChange={(e) => this.handleAlbumName(e)}/>
                    <Upload
                      listType='picture-card'
                      fileList={fileList}
                      multiple={true}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                      beforeUpload={this.beforeUpload}
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
                <Button style={{marginTop: '10px'}} onClick={() => this.handleSubmit()} type='primary'>Upload</Button>
              </Card>
              </Form>
            } 
            </div>
            :<Photo3D photos={userPhoto} handleVeiew={this.handleVeiew} view={this.props.view}/>
            }
          </div>
          :this.props.history.push('/')
        }
      </div>
      )
    }
  }
