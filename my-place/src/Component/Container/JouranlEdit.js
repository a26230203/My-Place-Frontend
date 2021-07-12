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
      journals: [],
    }
  
  componentDidMount() {
    fetch("http://localhost:3000/journals")
    .then(res => res.json())
    .then(journals => this.setState({journals}))
    fetch("http://localhost:3000/journal_drafts")
    .then(res => res.json())
    .then(journalDrafts => this.setState({journalDrafts}))

  }


  handlePublish = () => {
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
      this.props.history.push('/journal')
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
      alert("You draft is saved")
      this.setState({
        title: "",
        content: ""
      })
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
      console.log(this.state.content)
      return(
        <div>
        { Object.keys(this.props.loginUser).length > 0
          ?<div div className="journal-page">
            <div className="journal-header"></div>
              <Navbar /> 
                <div className="journal-sub-navbar">
                    <li onClick={() => this.handJournalClick()}><IoIosJournal style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Journal</li>
                    <li onClick={() => this.handDraftClick()}><RiDraftFill style={{fontSize: '24px', marginRight: '5px', marginBottom: '3px'}} />Draft({this.state.journalDrafts.length})</li>
                </div>
                <div className="new-jouranl">
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
                    content={this.props.currentJouranl.content}
                    init={{
                      content_style: "body { margin: 20px ; }",
                      width: 800,
                      min_height: 716,
                      branding: false,
                        plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists imagetools textpattern help emoticons autosave autoresize formatpainter',
                        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs | link image',
                        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                        placeholder: this.state.content,
                        relative_urls: false,
                        element_format : 'xhtml',
                        forced_root_block : "",
                        statusbar: false,
                        }}
                        onEditorChange={this.handleEditorChnage}
                      />  
                    <div className="btn">
                      <button  className="btn-publish" onClick={() => this.handlePublish()}>Publish</button>
                      <button  className="btn-cancel" onClick={() => this.handleDisplay()}>Cancel</button>
                      <button className="btn-save"  onClick={() => this.handleSave()}>Save as Draft</button>
                    </div>
                  </div>
              </div>
              :this.props.history.push('/')
        }
        </div> 
      )
    }
  }
  // const handlePublish = () => {
  //   const updateJouranl = {
  //     user_id: props.loginUser.id,
  //     title: title,
  //     content: content
  //   }

  //   fetch(`http://localhost:3000/journals/${props.currentJouranl.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updateJouranl),
  //   })
  //   .then(res => res.json())
  //   .then(() => {
  //     alert("Your edit is saved")
  //     props.history.push('/journal')
  //   })
  // }


  // const handleSave = () => {
  //   const newJouranlDraft = {
  //     user_id: props.loginUser.id,
  //     title: title,
  //     content: content
  //   }

  //   fetch("http://localhost:3000/journal_drafts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newJouranlDraft),
  //   })
  //   .then(res => res.json())
  //   .then(() => {
  //     alert("You draft is saved")
      
  //   })
  // }

  // const handleCancelClick = () => {
  //   props.history.push('journal')
  // }


  //   return (
  //     <div className="journal-edit">
  //       {Object.keys(props.loginUser).length > 0 
  //         ?<div>
  //         <Navbar />
  //         <div className="editing"> 
  //                   <input className="title"
  //                       type="text"
  //                       value = {title}
  //                       onChange={(e) => setTitle(e.target.value)} />
  //                   <h2>Content</h2>
  //                   <textarea className="content"
  //                       value = {content}
  //                       onChange={(e) => setContent(e.target.value)} />
  //                 <div className="btn">
  //                     <button className="btn-publish" onClick={() => handlePublish()}>Publish</button>
  //                     <button className="btn-cancel" onClick={() => handleCancelClick()}>Cancel</button>
  //                     <button className="btn-save" onClick={() => handleSave()}>Save as Draft</button>
  //                 </div>
  //               </div>
  //           </div>
  //           :props.history.push('/')    
  //         }
  //     </div>

  //   );