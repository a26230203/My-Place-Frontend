import React, { Component } from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Input } from 'antd';
import Navbar from './NavBar'
import JournalList from './Container/JournalList'

export default class Journal extends Component {

  state = {
    display: true,
    journals: [],
    journalDrafts: [],
    title: "",
    content: ""
  } 

  componentDidMount() {
    fetch("http://localhost:3000/journals")
    .then(res => res.json())
    .then(journals => this.setState({journals}))

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
      this.setState({
        content: ""
      })
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

  handleEditorChnage = (content) => {
      this.setState({content})
  }

  render() {
    var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return (
      <div>
        { Object.keys(this.props.loginUser).length > 0 
          ?<div>
            <Navbar />
              <div className="sub navbar">
                  <li onClick={() => this.handDraftClick()}>Draft({this.state.journalDrafts.length})</li>
              </div>

          {this.state.display
            ?<div className="journal">
            <button onClick={() => this.handleDisplay()}>Write Your Journal</button>
                {this.state.journals.length !== 0 
                ? this.state.journals.map((journal, index) => {
                  return <JournalList journal={journal} key={index} handleDelete={this.handleDelete} history={this.props.history} handleCurrentJouranl={this.props.handleCurrentJouranl}/>})
                :<div>
                  Here is your jourany begin
                </div>
                }
            </div>
            :<div className="Editor">
            <h2>Title</h2>
             <Input className="title"
                style={{width: 800}}
                placeholder="Wirte your title here"
                type="text"
                value = {this.state.title}
                  onChange={(e) => this.setState({title: e.target.value})}>
              </Input>
            <Editor 
              apiKey="ubuznhjw161y8fw2jyqsp5wsyl72c4d7pnjdvwi9rm7c0m8s"
              inline={false}
              initialValue={this.state.content}
              init={{
                  width: 1046,
                  min_height: 716,
                  branding: false,
                  plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter',
                  toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs | link image',
                  fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                  placeholder: "Write your content here",
                  relative_urls: false,
                  }}
                  onEditorChange={this.handleEditorChnage}
                />  
                    <div>
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
