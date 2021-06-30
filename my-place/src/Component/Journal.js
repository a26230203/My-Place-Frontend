import React, { useEffect, useState } from 'react';
import JournalDetial from './Container/JournalDetail'
import Navbar from './NavBar'
import JournalList from './Container/JournalList'

function Journal(props) {

  let [display, setDisplay] = useState(true)
  let [journals, setJournals] = useState([])
  let [journalDrafts, setJournalDrafts] = useState([])
  let [title, setTitle] = useState("")
  let [content, setContent] = useState("")


  useEffect(() => {
    fetch("http://localhost:3000/journals")
    .then(res => res.json())
    .then(journals => setJournals(journals))

    fetch("http://localhost:3000/journal_drafts")
    .then(res => res.json())
    .then(journalDrafts => setJournalDrafts(journalDrafts))
  }, [])

  const handleDisplay = ()=> {
    setDisplay(!display)
  }


  const handlePublish = () => {
    const newJouranl = {
      user_id: props.loginUser.id,
      title: title,
      content: content
    }
    fetch("http://localhost:3000/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJouranl),
    })
    .then(res => res.json())
    .then(journals => {
      setJournals(...journals)
      setDisplay(!display)
      console.log(journals)
    })
  }

  const handleDelete = (jouranl) => {
    fetch(`http://localhost:3000/journals/${jouranl.id}`, {
      method: "DELETE"
    })
    .then(res => res.json)
    .then(() => {
      setJournals(...journals)
      alert("Your journal is being deleted")
    })
  }


    return (
      <div>
        { Object.keys(props.loginUser).length > 0 
          ?<div>
            <Navbar />
              <div className="sub navbar">
                  <li>Draft({journalDrafts.length == 0 ? null : journalDrafts.length - 1 })</li>
              </div>

            <button onClick={() => handleDisplay()}>Write a journal</button>

            {display
            ?<div className="journal">
                {journals.length !== 0 
                ? journals.map(journal => {
                  return <JournalList journal={journal} key={journal.id} handleDelete={handleDelete}/>})
                :<div>
                  Here is your jourany begin
                </div>
                }
            </div>
            :<div>
                <h2>New Journal</h2>
                  <div className="writing"> 
                      <input className="title"
                          placeholder="Please enter your title"
                          type="text"
                          value = {title}
                          onChange={(e) => setTitle(e.target.value)} />
                      <h2>Content</h2>
                      <textarea className="content"
                          placeholder="Please enter your content"
                          value = {content}
                          onChange={(e) => setContent(e.target.value)} />
                    <div className="btn">
                        <button onClick={(e) => handlePublish(e)}>Publish</button>
                        <button>Save as Draft</button>
                    </div>
                  </div>
            </div>}
          </div>
          :  props.history.push('/')
        }
      </div>

    );
  }

  export default Journal;