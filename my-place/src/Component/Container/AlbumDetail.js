import React, { Component } from "react";
import { Image, message, Select  } from 'antd';
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
      <div className="photo-List">
            <Image.PreviewGroup>
                {albumPhoto.map(photo => {
                    return <PhotoList photo={photo} handleRemoveFromAblum={this.handleRemoveFromAblum}/> 
                })
                }
            </Image.PreviewGroup>

      </div>
    );
    }
  }

