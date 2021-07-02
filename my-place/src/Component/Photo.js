import React, { Component } from "react";
import { Card, Upload, Modal, Form, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Navbar from './NavBar'
import PhotoDetial from './Container/PhotoDetail'


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
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [], 
    upFiles:[]
    }


    componentDidMount() {
      fetch("http://localhost:3000/photos")
      .then(res => res.json())
      .then(photos => this.setState({photos}))
    }

    onChange = ({ target: { value } }) => {
      this.setState({ value });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    handleCancel = () => this.setState({ previewVisible: false });

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


    handleSubmit = () => {
      const {upFiles} = this.state;
      const formData = new FormData();
       upFiles.forEach((file) => {
        formData.append('image', file);
        formData.append('name', file.name);
        formData.append('user_id', this.props.loginUser.id);
        fetch("http://localhost:3000/photoupload", {
          method: "POST",
          body: formData
        })
      });

  }

    render() {
      const { previewVisible, previewImage, fileList, previewTitle } = this.state;
      console.log(this.state.photos);
      return (
      <div className="photo">
          <Navbar />
          <div className="photo-subnav">
              <li>Album</li>
              <li>Photos</li>
          </div>
          <div className="photo-btn">
             <button>Upload Photo</button>
             <button>Create Album</button>
          </div>
          {
                this.state.photos.map(photo => {
                  return <PhotoDetial photo={photo} key={photo.id}/>
              })
          } 
        <Card title='Photo Upload'>
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
      </div>
      )
    }
  }
