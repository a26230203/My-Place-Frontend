import React, { Component } from "react";
import { Form, Button, Image, Input } from 'antd'
import PhotoList from "./Container/PhotoList";
import Navbar from './NavBar'

export default class Album extends Component {

  state = {
    albumForm: false,
    }

      //Display album form
      handleCreatalbum = () => {
        this.setState({
          albumForm : !this.state.albumForm
        })
      }
  
      handleAlbumName = (e) => {
        this.setState({
          albumName: e.target.value
        })
      }
  
      //Create ablum
      handleConfirm = () => {
        const newAlbun ={
          name: this.state.albumName
        }
  
        fetch("http://localhost:3000/albums", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: this.props.loginUser.id,
            name: this.state.albumName
          }),
        })
        .then(res => res.json())
        .then(() => {
          this.props.history.push('/album')
        })
      }
  render(){
    return (
      <div className="music">
          <Navbar />
          <button onClick={() => this.handleCreatalbum()}>Create Album</button>
         
      </div>

    );
   }
}
