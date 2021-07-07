import React, {Component} from "react";
import { Image, Card } from 'antd'
import Navbar from './NavBar'



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
      console.log(this.state.photos)
    return (
      <div className="home-page">
        {
        Object.keys(this.props.loginUser).length > 0
        ?<div>
          <h1>My <span>Place</span></h1>
          <Navbar loginUser={this.props.loginUser}/>
                <h4 className="recent-pohot">Recent Photos</h4>
              <Card className="photo-card">
              <Image.PreviewGroup>
                <div className="photo-row">
                  {this.state.photos.map((photo, index) => {
                    return<div className={`photo-colum${index}`}>
                        <Image
                        className={`img${index}` }               
                        src={photo.image}>
                        </Image>
                        {/* <h4 className="photo-name">{photo.name}</h4> */}
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
