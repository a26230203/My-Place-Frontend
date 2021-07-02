import React, { useState } from 'react';
import Navbar from '../NavBar'

function JournalEdit(props) {
  
  let [title, setTitle] = useState(props.currentJouranl.title)
  let [content, setContent] = useState(props.currentJouranl.content)


  const handlePublish = () => {
    const updateJouranl = {
      user_id: props.loginUser.id,
      title: title,
      content: content
    }

    fetch(`http://localhost:3000/journals/${props.currentJouranl.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateJouranl),
    })
    .then(res => res.json())
    .then(() => {
      alert("Your edit is saved")
      props.history.push('/journal')
    })
  }


  const handleSave = () => {
    const newJouranlDraft = {
      user_id: props.loginUser.id,
      title: title,
      content: content
    }

    fetch("http://localhost:3000/journal_drafts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJouranlDraft),
    })
    .then(res => res.json())
    .then(() => {
      alert("You draft is saved")
    })
  }

  const handleCancelClick = () => {
    props.history.push('journal')
  }


    return (
      <div className="journal-edit">
        {Object.keys(props.loginUser).length > 0 
          ?<div>
          <Navbar />
          <div className="editing"> 
                    <input className="title"
                        type="text"
                        value = {title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <h2>Content</h2>
                    <textarea className="content"
                        value = {content}
                        onChange={(e) => setContent(e.target.value)} />
                  <div className="btn">
                      <button onClick={() => handlePublish()}>Publish</button>
                      <button onClick={() => handleCancelClick()}>Cancel</button>
                      <button onClick={() => handleSave()}>Save as Draft</button>
                  </div>
                </div>
            </div>
            :props.history.push('/')    
          }
      </div>

    );
  }

  export default JournalEdit;