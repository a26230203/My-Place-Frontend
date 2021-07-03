import React from "react";
import { Card, Upload, Modal, Form, Button, Image, Input, Select, message  } from 'antd'
import {  PlusOutlined } from '@ant-design/icons';
import Navbar from './NavBar'
import PhotoList from "./Container/PhotoList";

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Photo extends React.Component {

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
         fetch("http://localhost:3000/photoupload", {
           method: "POST",
           body: formData
         })
         .then(res => res.json())
         .then(() => {
           this.componentDidMount()
         })
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



    render() {
      const { previewVisible, previewImage, fileList, previewTitle } = this.state;
      return (
      <div className="photo">
        { Object.keys(this.props.loginUser).length > 0 
          ?<div>
            <Navbar />
            <div className="photo-subnav">
                <li onClick={() => this.handlClickPhoto()}>Photos</li>
                <li onClick={() => this.handlClickAlbum()}>Album</li>
            </div>
            <div className="photo-btn">
              <button onClick={() => this.handleDisplay()}>Upload Photo</button>
              <button onClick={() => this.handleCreatalbum()}>Create Album</button>
            </div>
            {this.state.albumForm
            ?<Form>
              <Input addonBefore="Album Title:" 
              style={{width: '500px'}} 
              value={this.state.albumName}
              onChange={(e) => this.handleAlbumName(e)}/>
              <Button type="primary" shape="round" onClick={() => this.handleConfirm()}>Confirm</Button>
              <Button type="primary" shape="round" onClick={() => this.handleConfirm()}>Cancel</Button>
            </Form>
            :null
          }
            {this.state.display
              ?<div>
                <Image.PreviewGroup>
                {
                this.state.photos.map(photo => {
                    return <PhotoList photo={photo} key={photo.id} handleDelete={this.handleDelete} album={this.state.album} 
                    AddPhotoToAlbum={this.AddPhotoToAlbum}/>
                  })
                }
                 </Image.PreviewGroup>
              </div>
            :<Form >
            <Card title='Photo Upload'>
                  <Input addonBefore="Album Title:" 
                    style={{width: '500px'}} 
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
              <Button onClick={() => this.handleSubmit()} type='primary' >submit</Button>
            </Card>
            </Form>
          } 
          </div>
          :this.props.history.push('/')
        }
      </div>
      )
    }
  }
