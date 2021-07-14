import React, { useState } from 'react';
import { IoIosJournal  } from "react-icons/io";
import { RiDraftFill } from "react-icons/ri";
import Navbar from '../NavBar'


function JournalDetial(props) {
  let [title, setTitle] = useState(props.currentJouranl.title)
  let [content, setContent] = useState(props.currentJouranl.content)
  const date = new Date(props.currentJouranl.created_at)

  const handDraftClick = () => {
    props.history.push('/journaldraft')
  }

  const handJournalClick = () => {
    props.history.push('/journal')
  }


    return (
      <div >
        {Object.keys(props.loginUser).length > 0 
          ?<div div className="journal-page">
            <div className="journal-header"></div>
          <Navbar loginUser={props.loginUser} handlehideMusic={props.handlehideMusic}/>
          <div className="journal-sub-navbar">
                  <li onClick={() => handJournalClick()}><IoIosJournal style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Journal</li>
                  <li onClick={() => handDraftClick()}><RiDraftFill style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Draft</li>
          </div>
          <div className="journal-detail-list-container">
          <div className="sub">
            <h1 className="sub-title">{title}</h1>
            <li className="sub-date" >{date.toLocaleDateString()}</li>
          </div>  
          <div className="journal-detail-list-detial"> 
                  <h2>{title}</h2>
                  <p>{content}</p>
                </div>
            </div>
          </div>
            :props.history.push('/')    
          }
      </div>

    );
  }
  export default JournalDetial;