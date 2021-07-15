import React, { Component } from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IoIosJournal  } from "react-icons/io";
import { RiDraftFill } from "react-icons/ri";
import Navbar from './NavBar'
import JournalList from './Container/JournalList'

export default class Journal extends Component {

  state = {
    display: true,
    journals: [],
    journalDrafts: [],
    title: "",
    content: "",
    upload: []
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
      display: !this.state.display,
      content: "",
      title: "",
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
        content: "",
        title: ""
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

  handJournalClick = () => {
    this.props.history.push('/journal')
  }

  handleEditorChnage = (content) => {
      this.setState({content})
  }


  render() {
    const userJournal = this.state.journals.filter(journal => journal.user_id === this.props.loginUser.id)
    const userJouranlDraft = this.state.journalDrafts.filter(journal => journal.user_id === this.props.loginUser.id) 
    return (
      <div>
        { Object.keys(this.props.loginUser).length > 0 
          ?<div className="journal-page">
            <div className="journal-header"></div>
            <Navbar  loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic} handleLoignUser={this.props.handleLoignUser}/>
              <div className="journal-sub-navbar">
                  <li onClick={() => this.handJournalClick()}><IoIosJournal style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Journal</li>
                  <li onClick={() => this.handDraftClick()}><RiDraftFill style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Draft({userJouranlDraft.length})</li>
              </div>
                
          {this.state.display
            ?<div className="journal-list-container">
              <hr className="solid"></hr>
            <button className="journal-list-btn" onClick={() => this.handleDisplay()}>Write Your Journal</button>
              <hr className="solid"></hr>
                {userJournal.length !== 0 
                ?<div className="journal-list-content">
                  {userJournal.map((journal, index) => {
                  return <JournalList journal={journal} key={index} handleDelete={this.handleDelete} history={this.props.history} handleCurrentJouranl={this.props.handleCurrentJouranl}/>})
                  }  
                  </div>
                :<div className="journal-no-content">
                  <h4>Your Story begin here</h4>
                </div>
                }
            </div>
            :<div className="new-jouranl">
                <CloseCircleOutlined className="new-jouranl-btn" style={{fontSize: '24px'}} onClick={() => this.handleDisplay()}/>  
                <h2>New Journal</h2>
                <Input className="title"
                    addonBefore="Title: "
                    placeholder="Wirte your title here"
                    type="text"
                    value = {this.state.title}
                      onChange={(e) => this.setState({title: e.target.value})}>
                  </Input>
                <Editor 
                  className="editor"
                  apiKey="ubuznhjw161y8fw2jyqsp5wsyl72c4d7pnjdvwi9rm7c0m8s"
                  inline={false}
                  Value={this.state.content}
                  init={{
                      content_style: "body { margin: 20px ; }",
                      width: 800,
                      min_height: 716,
                      branding: false,
                      plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists imagetools textpattern help emoticons autosave autoresize formatpainter paste',
                      toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs | link',
                      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                      placeholder: "Write your content here",
                      relative_urls: false,
                      element_format : 'xhtml',
                      forced_root_block : "",
                      statusbar: false,
                      paste_as_text: true,
                      entities: 'raw', 
                    }}
                      onEditorChange={this.handleEditorChnage}
                    />  
                  <div className="btn">
                    <button  className="btn-publish" onClick={() => this.handlePublish()}>Publish</button>
                    <button  className="btn-cancel" onClick={() => this.handleDisplay()}>Cancel</button>
                    <button className="btn-save"  onClick={() => this.handleSave()}>Save as Draft</button>
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

