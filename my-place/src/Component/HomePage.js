import React, {Component} from "react";
import { Image, Card } from 'antd'
import Navbar from './NavBar'
import Weather from "./Weather";



const { Meta } = Card;
export default class HomePage extends Component  {

  state = {
    photos: [],
    journals: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/photos")
    .then(res => res.json())
    .then(photos =>{
       if(photos.length > 3) {
         const recentPhoto = photos.slice(-3)
            this.setState({
              photos: recentPhoto
            })
       }else{
            this.setState({photos})
       }
    })

    fetch("http://localhost:3000/journals")
    .then(res => res.json())
    .then(journals => {
      if(journals.length > 3) {
        const recentJournal = journals.slice(-3)
          this.setState({
            journals: recentJournal
          })
      }else {
        this.setState({journals})
      } 
    })
  }
  
  render() {
    return (
      <div className="home-page">
        {
        Object.keys(this.props.loginUser).length > 0
        ?<div>
          <h1>My <span>Place</span></h1>
          <Navbar loginUser={this.props.loginUser}/>
          <Weather loginUser={this.props.loginUser}/>
                <h4 className="recent-pohot">Recent Story</h4>
              <Card className="photo-card">
              <Image.PreviewGroup>
                <div className="photo-row">
                  {this.state.photos.map((photo, index) => {
                    return<div className={`photo-colum${index}`}>
                        <Image
                        className={`img${index}` }               
                        src={photo.image}>
                        </Image>
                    </div>
                  })
                }
              </div>
              </Image.PreviewGroup>
            </Card>
        </div>
        : this.props.history.push('/')
        }
      </div>
      );
    }
  }
