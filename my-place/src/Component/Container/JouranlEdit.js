import React, { Component } from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Input } from 'antd';
import { IoIosJournal } from "react-icons/io";
import { RiDraftFill } from "react-icons/ri";
import { CloseCircleOutlined } from '@ant-design/icons';
import Navbar from '../NavBar'

export default class JournalEdit extends Component {
    state = {
      title: this.props.currentJouranl.title,
      content: this.props.currentJouranl.content,
      journalDrafts: [],
    }
  
  componentDidMount() {
    fetch("http://localhost:3000/journal_drafts")
    .then(res => res.json())
    .then(journalDrafts => this.setState({journalDrafts}))
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
      this.props.history.push('/journal') 
    })
  }

  saveToJournal = () => {
    const updateJouranl = {
      user_id: this.props.loginUser.id,
      title: this.state.title,
      content: this.state.content
    }

    fetch(`http://localhost:3000/journals/${this.props.currentJouranl.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateJouranl),
    })
    .then(res => res.json())
    .then(() => {
      alert("Your edit is saved")
      this.setState({
        title: "",
        content: ""
      })
    })
    this.props.history.push('/journal')
  }

  saveToJournalDraft = () => {
    const newJouranlDraft = {
      user_id: this.props.loginUser.id,
      title: this.state.title,
      content: this.state.content
    }

    fetch(`http://localhost:3000/journal_drafts/${this.props.currentJouranl.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJouranlDraft),
    })
    .then(res => res.json())
    .then(() => {
      alert("You draft is saved")
      this.setState({
        title: "",
        content: ""
      })
      this.props.history.push('/journaldraft')
    })
  }

  handleCancelClick = () => {
    this.props.history.push('journal')
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
      const userJouranlDraft = this.state.journalDrafts.filter(journal => journal.user_id === this.props.loginUser.id) 
      const typeOfJournal = userJouranlDraft.filter(journal => journal.id === this.props.currentJouranl.id && journal.text === this.props.currentJouranl.text)
      console.log(typeOfJournal)
      return(
        <div>
        { Object.keys(this.props.loginUser).length > 0
          ?<div div className="journal-page">
            <div className="journal-header"></div>
              <Navbar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic}/> 
                <div className="journal-sub-navbar">
                    <li onClick={() => this.handJournalClick()}><IoIosJournal style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Journal</li>
                    <li onClick={() => this.handDraftClick()}><RiDraftFill style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Draft({this.state.journalDrafts.length})</li>
                </div>
                <div className="new-jouranl">
                  <CloseCircleOutlined className="new-jouranl-btn" style={{fontSize: '24px'}} onClick={() => this.handleCancelClick()}/>  
                  <h2>Edit Journal</h2>
                  <Input className="title"
                      addonBefore="Title: "
                      placeholder="Wirte your title here"
                      type="text"
                      value = {this.state.title}
                        onChange={(e) => this.setState({title: e.target.value})}>
                    </Input>
                  <Editor 
                    apiKey="ubuznhjw161y8fw2jyqsp5wsyl72c4d7pnjdvwi9rm7c0m8s"
                    inline={false}
                    value={this.state.content}
                    init={{
                      content_style: "body { margin: 20px ; }",
                      width: 800,
                      min_height: 716,
                      branding: false,
                        plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists imagetools textpattern help emoticons autosave autoresize formatpainter paste',
                        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs | link image',
                        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                        placeholder: this.state.content,
                        relative_urls: false,
                        element_format : 'xhtml',
                        forced_root_block : " ",
                        entities: '160,nbsp,162,cent,8364,euro,163,pound',
                        entities_encoding: 'raw', 
                        statusbar: false,
                        paste_as_text: true,
                        setup: (editor) => {
                          editor.getContent(this.state.content)
                        }
                        }}
                        onEditorChange={this.handleEditorChnage}
                      />  
                    <div className="btn">
                      <button  className="btn-publish" onClick={() => this.handlePublish()}>Publish</button>
                      {typeOfJournal.length > 0 
                        ?  <button className="btn-save"  onClick={() => this.saveToJournalDraft()}>Save</button>
                        :  <button className="btn-save"  onClick={() => this.saveToJournal()}>Save</button>
                      }
                      <button  className="btn-cancel" onClick={() => this.handleCancelClick()}>Cancel</button>
                    </div>
                  </div>
              </div>
              :this.props.history.push('/')
        }
        </div> 
      )
    }
  }