import React, { useState } from 'react';
import Navbar from '../NavBar'

function JournalEdit(props) {
    let [title, setTitle] = useState(props.journal.title)
    let [content, setContent] = useState(props.journal.content)


    return (
      <div className="journal-edit">
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
                      <button>Publish</button>
                      <button>Save as Draft</button>
                  </div>
                </div>
      </div>

    );
  }

  export default JournalEdit;