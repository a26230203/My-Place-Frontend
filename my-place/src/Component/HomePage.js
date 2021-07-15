import React, {Component} from "react";
import { Image, Card, Calendar  } from 'antd'
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
    const userPhoto = this.state.photos.filter(photo => photo.user_id === this.props.loginUser.id)
    const userjournal = this.state.journals.filter(journal => journal.user_id === this.props.loginUser.id)
    return (
      <div className="home-page">
        {
        Object.keys(this.props.loginUser).length > 0
        ?<div>
          <h1>My <span>Place</span></h1>
          <Navbar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic} handleLoignUser={this.props.handleLoignUser}/>
          <Weather className="weather" loginUser={this.props.loginUser}/>

                <h4 className="recent-pohot">Recent Story</h4>
              <Card className="photo-card">
              {userPhoto.length > 0
                ?<Image.PreviewGroup>
                  <div className="photo-row">
                    {userPhoto.map((photo, index) => {
                      return<div 
                      className={`photo-colum${index}`} 
                      key={index}
                      >
                          <Image
                          className={`img${index}` }               
                          src={photo.image}>
                          </Image>
                      </div>
                    })
                  }
                </div>
                </Image.PreviewGroup>
              : <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png' 
                  style={{width: '450px',height: '450px'}}
                />
              }
              <div className="site-calendar">
              </div>
              {userjournal.length > 0 
              ?<div className="journal-div">
                    {userjournal.map(journal => {
                      return <div className="jounral-detial" key={journal.id}>
                                {journal.title !== ""
                                ?<div className="journal-detial-title">{journal.title}</div>
                                :<div>No Title</div>
                                }
                                 <p className="jounral-detial-p">{journal.content}</p>
                            </div>
                    })
                    }
              </div>   
              :null
              }
            </Card>
              <div className="site-calendar">
               <Calendar fullscreen={false}/>  
              </div>
        </div>
        : this.props.history.push('/')
        }
      </div>
      );
    }
  }
