import React, { Component } from "react";
import {  Form, Button, message, Input } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';
import { MdPhoto, MdPhotoAlbum} from "react-icons/md";
import Navbar from './NavBar'
import AlbumList from './Container/AlbumList'
import AlbumDetail from "./Container/AlbumDetail";


export default class Album extends Component {

  state = {
    photos: [],
    album: [],
    albumForm: false,
    albumName: '',
    displayDetail: false,
    currentAlbum: {}
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

    //Display album form
    handleCreatalbum = () => {
      this.setState({
        albumForm : !this.state.albumForm
      })
    }

    //Handle albun name 
    handleAlbumName = (e) => {
      this.setState({
        albumName: e.target.value
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

    //See album detail
    handleClickCoverAlbum = (albumObj) => {
      this.setState({
        displayDetail: !this.state.displayDetail, 
        currentAlbum: albumObj
      })
    } 

    handleCancleAlbum = () => {
      this.setState({
        displayDetail: !this.state.displayDetail, 
      })
    }
   
    //Delete album
    handleDelete =(albumObj) => {
      fetch(`http://localhost:3000/albums/${albumObj.id}`, {
          method: "DELETE",
        })
        .then(res => res.json())

        fetch(`http://localhost:3000/photoalbum`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            album_id: albumObj.id
          })
        })  
        .then(() => {
          this.componentDidMount()
        })
      }

    render() {
      const userPhoto = this.state.photos.filter(photo => photo.user_id === this.props.loginUser.id)
      const useralbum = this.state.album.filter(album => album.user_id === this.props.loginUser.id)
      return (
      <div className="ablum">
        { Object.keys(this.props.loginUser).length > 0 
          ?<div>
            <div className="album-page-header"></div>
            <Navbar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic} handleLoignUser={this.props.handleLoignUser}/>
            {this.state.displayDetail
              ?<AlbumDetail album={this.state.currentAlbum} handleCancleAlbum={this.handleCancleAlbum}/>
              :<div className="album-page">
                <div className="album-subnav">
                  <li className="albun-subnav-li" onClick={() => this.handlClickPhoto()}>
                  <MdPhoto style={{fontSize: 30  }}/>
                    Photos({userPhoto.length})</li>
                  <li  className="photo-subnav-li" onClick={() => this.handlClickAlbum()}>
                  <MdPhotoAlbum style={{fontSize: 30  }}/>
                    Album({useralbum.length})</li>
              </div>
                  <div className="photo-btn">

                    <button onClick={() => this.handleCreatalbum()}>Create Album</button>
                  </div>
                  {this.state.albumForm
                    ?<div>
                    <CloseCircleOutlined className="album-creat-btn" style={{fontSize: '30px'}} onClick={() => this.handleCreatalbum()}/>
                    <Form className="ablum-create" > 
                      <Input addonBefore="Album Title:" 
                      style={{width: '500px'}} 
                      value={this.state.albumName}
                      onChange={(e) => this.handleAlbumName(e)}/>
                      <Button className="album-creat-confrim" type="primary" shape="round" onClick={() => this.handleConfirm()}>Confirm</Button>
                    </Form>
                      </div>
                    :null
                  }
                  {useralbum.map(album => {
                    return  <AlbumList className="album-list" key={album.id} loginUser={this.props.loginUser} photos={userPhoto} album={album} 
                    handleDelete={this.handleDelete} handleClickCoverAlbum={this.handleClickCoverAlbum}/>
                  })
                  }
                </div>  
            }     
          </div>
          :this.props.history.push('/')
        }
      </div>
      )
    }
  }