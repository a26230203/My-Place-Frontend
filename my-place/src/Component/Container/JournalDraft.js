import React, { Component } from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IoIosJournal, IoLogoChrome } from "react-icons/io";
import { RiDraftFill } from "react-icons/ri";
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
      this.setState({
        title: "",
        content: ""
      }) 
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
      this.setState({
        title: "",
        content: ""
      }) 
    })
  }

   handleDraftDelete = (jouranl) => {
    fetch(`http://localhost:3000/journal_drafts/${jouranl.id}`, {
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

  handJournalClick = () => {
    this.props.history.push('/journal')
  }

  handleEditorChnage = (content) => {
    this.setState({content})
}

  render() {
    return (
      <div>
        { Object.keys(this.props.loginUser).length > 0 
          ?<div className="journal-page">
          <div className="journal-header"></div>
          <Navbar />
            <div className="journal-sub-navbar">
                <li onClick={() => this.handJournalClick()}><IoIosJournal style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Journal</li>
                <li onClick={() => this.handDraftClick()}><RiDraftFill style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Draft({this.state.journalDrafts.length})</li>
            </div>

            {this.state.display
            ?<div className="journal-list-container">
              <hr class="solid"></hr>
            <button className="journal-list-btn" onClick={() => this.handleDisplay()}>Write Your Journal</button>
              <hr class="solid"></hr>
                <div className="journal-list-content">
                  {this.state.journalDrafts.map((journal, index) => {
                  return <JournalList journal={journal} key={index} handleDraftDelete={this.handleDraftDelete} history={this.props.history} handleCurrentJouranl={this.props.handleCurrentJouranl}/>})
                  }
                  </div>
            </div>
            :<div className="Editor">
                <CloseCircleOutlined style={{fontSize: '24px'}} onClick={() => this.handleDisplay()}/>  
                <h2>Title</h2>
                <Input className="title"
                    style={{width: 800}}
                    addonBefore="Title: "
                    placeholder="Wirte your title here"
                    type="text"
                    value = {this.state.title}
                      onChange={(e) => this.setState({title: e.target.value})}>
                  </Input>
                <Editor 
                  apiKey="ubuznhjw161y8fw2jyqsp5wsyl72c4d7pnjdvwi9rm7c0m8s"
                  inline={false}
                  Value={this.state.content}
                  init={{
                      width: 1046,
                      min_height: 716,
                      branding: false,
                      plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter',
                      toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs | link image',
                      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                      placeholder: "Write your content here",
                      relative_urls: false,
                      forced_root_block : " "
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
