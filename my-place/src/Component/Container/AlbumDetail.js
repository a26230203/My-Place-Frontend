import React, { Component } from "react";
import { Image, message, Select, Card  } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import PhotoList from './PhotoList';

const { Option } = Select;

export default class AlbumDetail extends Component{

    state = {
        photos: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/photos")
        .then(res => res.json())
        .then(photos => this.setState({photos}))
      }

  handleRemoveFromAblum =(photoObj) => {
      fetch(`http://localhost:3000/removealbum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoObj)
      })
      .then(res => {
          message.info("Photo removed from curren ablum")
          this.componentDidMount()
      })
    }

   render() {
        const albumPhoto = this.state.photos.filter(photo => photo.album_id == this.props.album.id)
    return (
        <div className="album-photo-page-list">
        <CloseCircleOutlined  style={{fontSize: "30px", marginLeft: '1600px ', marginButtom: '50px  '}} onClick={() => this.props.handleCancleAlbum()}/>
            <div>
              <Image.PreviewGroup>

                  {albumPhoto.map(photo => {
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
        </div>
    );
    }
  }

