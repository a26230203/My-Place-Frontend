import React, { Component } from "react";
import Navbar from '../NavBar'
import JournalList from './JournalList'

export default class JournalDraft extends Component {

  state = {
    display: true,
    journalDrafts: [],
    title: "",
    content: ""
  } 

  componentDidMount() {
    fetch("http://localhost:3000/journal_drafts")
    .then(res => res.json())
    .then(journalDrafts => this.setState({journalDrafts}))

  }


  handleDisplay = () => {
    this.setState({
      display: !this.state.display
    })
  }

   handlePublish = () => {
    const newJouranl = {
      user_id: this.props.loginUser.id,
      title: this.state.title,
      content: this.state.content
    }

    fetch("http://localhost:3000/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJouranl),
    })
    .then(res => res.json())
    .then(() => {
      this.componentDidMount()
      this.handleDisplay() 
    })
  }

  handleSave = () => {
    const newJouranlDraft = {
      user_id: this.props.loginUser.id,
      title: this.state.title,
      content: this.state.content
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
      this.componentDidMount()
      this.handleDisplay() 
    })
  }

   handleDelete = (jouranl) => {
    fetch(`http://localhost:3000/journals/${jouranl.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      alert("Your journal is being deleted")
      this.componentDidMount()

    })
  }

  handDraftClick = () => {
    this.props.history.push('/journaldraft')
  }

  handMyJournalClick = () => {
    this.props.history.push('/journal')
  }

  render() {
    return (
      <div>
        { Object.keys(this.props.loginUser).length > 0 
          ?<div>
            <Navbar />
              <div className="sub navbar">
                  <li onClick={() => this.handMyJournalClick()}>My journal</li>
                  <li onClick={() => this.handDraftClick()}>Draft({this.state.journalDrafts.length})</li>
              </div>

            <button onClick={() => this.handleDisplay()}>Write a journal</button>

          {this.state.display
            ?<div className="journal">
                {this.state.journalDrafts.length !== 0 
                ?<div>
                <h2>Draft({this.state.journalDrafts.length})</h2>
                {this.state.journalDrafts.map((journal, index) => {
                  return <JournalList journal={journal} key={index} handleDelete={this.handleDelete}/>})}
                 </div>
                :null
                }
            </div>
            :
            <div className="writing">
              <h2>Title</h2>
              <input className="title"
                placeholder="Please enter your title"
                type="text"
                value = {this.state.title}
                onChange={(e) => this.setState({title: e.target.value})} />
              <h2>Content</h2>
              <textarea className="content"
                placeholder="Please enter your content"
                value = {this.state.content}
                onChange={(e) => this.setState({content: e.target.value})} />
              <div className="btn">
              <button onClick={() => this.handlePublish()}>Publish</button>
              <button onClick={() => this.handleDisplay()}>Cancel</button>
              <button onClick={() => this.handleSave()}>Save as Draft</button>
            </div>
          </div>
          }
          </div>
           :this.props.history.push('/')
        }
      </div>

    );
  }
}
