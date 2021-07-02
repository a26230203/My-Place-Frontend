import React, { useState } from 'react';
import Navbar from '../NavBar'


function JournalDetial(props) {
  let [title, setTitle] = useState(props.currentJouranl.title)
  let [content, setContent] = useState(props.currentJouranl.content)
  const date = new Date(props.currentJouranl.created_at)

    return (
      <div className="journal-detail">
        {Object.keys(props.loginUser).length > 0 
          ?<div>
          <Navbar />
          <div>
          <h2>{title}</h2>
          <li>{date.toLocaleDateString()}</li>
          </div>
          <div className="detial"> 
                  <h2>{title}</h2>
                  <p>{content}</p>
                </div>
            </div>
            :props.history.push('/')    
          }
      </div>

    );
  }
  export default JournalDetial;