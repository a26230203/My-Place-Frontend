import React, { Component } from "react";
import { Select } from 'antd';
import Draggable from 'react-draggable'; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoSave } from "react-icons/io5";
import NavBar from "./NavBar";


const { Option } = Select;
export default class Notes extends Component{

    state = {
        edit: false,
        userTyping: "",
        editTyping: "",
        currentNote: {},
        notes: [],
        colors: '#FFCC00',
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/notes")
        .then(res => res.json())
        .then(notes => this.setState({notes: notes.notes }))
      }


    generatorNote = (text) => {
        const maxWidth = window.innerWidth
        const maxHeight = window.innerHeight
        let randX = parseInt((maxWidth - 250) * Math.random() * 0.4)
        let randY = parseInt((maxHeight - 350) * Math.random() * 0.5)
        let color = this.state.colors
        let note = {
            user_id: this.props.loginUser.id,
            text,
            color,
            y: randX,
            x: randY
        }
        return note
    }


    addStikcy = (e) => {
        e.preventDefault()
        let newNote = this.generatorNote(e.target[1].value)
        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
            .then(res => {
                this.setState({
                    userTyping: "",
                    notes: [...this.state.notes, newNote]
                })
                this.componentDidMount()
            })
    }

    deleteNote = (noteObj) => {
        const updateStikcyObj = this.state.notes.filter(note => note.id !== noteObj.id )
        fetch(`http://localhost:3000/notes/${noteObj.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateStikcyObj),
        })
        this.setState({
            notes: updateStikcyObj
        })
    }

    handleSelectChange = (e) => {
        this.setState({
            colors: e.target.value
        })
    }

    handleOnchange = (e) => {
        this.setState({
            userTyping: e.target.value
        })
    }

    handleEditTypingChange = (e) => {
        this.setState({
            editTyping: e.target.value
        })
    }

    handleEditChange = ( noteObj) => {
        if(noteObj.id === this.state.currentNote.id){
            this.setState({
                edit: !this.state.edit,
                editTyping: noteObj.text
            })
        }else {
            this.setState({
                edit: !this.state.edit,
                currentNote: noteObj,
                editTyping: noteObj.text
            })
        }
    }
    handleCancleEdit = () => {
        this.setState({
            edit: !this.state.edit,
        })
    } 

    
    handleUpdateEdit = (noteObj) => {
        fetch(`http://localhost:3000/notes/${noteObj.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: this.state.editTyping,
            }),    
        })
        .then(res => {
            this.componentDidMount()
            this.handleCancleEdit()
        })

    }

    handleOnStop = (e, v, noteObj) => {
        console.log(`x:${v.x}, y:${v.y}, ${noteObj.id}, objX:${noteObj.x}, objY:${noteObj.y}`)
            let newX = parseInt(noteObj.x) + v.x
            let newY = parseInt(noteObj.y) + v.y
            const {dragNot, currentNote} = this.state
        console.log(typeof(newX), typeof(newY) )
        console.log(`finalX:${newX}, finalY:${newY}`)
        fetch(`http://localhost:3000/notes/${noteObj.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                x: newX,
                y: newY
            }),
        })  
            this.setState({
                currentNote: {...noteObj, "x":newX, "y":newY}
            })
    }   

    render() {
        const {currentNote, editTyping , dragNot} = this.state
        const userNote = this.state.notes.filter(note => note.user_id === this.props.loginUser.id)
        
        return(
            <div>
                { Object.keys(this.props.loginUser).length > 0 
                    ?<div className="note-page">
                            <div className="note-page-header"></div>
                            <NavBar loginUser={this.props.loginUser} handlehideMusic={this.props.handlehideMusic}/>
                            <div className="note-page-container">
                                <form onSubmit={(e) => this.addStikcy(e)} className="note">
                                    <select className="selector" defaultValue='Select color' style={{ width: 252, backgroundColor: `${this.state.colors}`, }} onChange={this.handleSelectChange}>
                                    <option value='Select color' disabled>Select color</option>
                                    <option style={{backgroundColor:`#96C2F1` }} value='#96C2F1'>Blue</option>
                                    <option style={{backgroundColor:`#D5F1BB` }} value='#D5F1BB'>Green</option>
                                    <option style={{backgroundColor:`#FFFF99` }} value='#FFFF99'>Yellow</option>
                                    <option style={{backgroundColor:`#FFCC00` }} value='#FFCC00'>Orange</option>
                                    </select> 

                                    <textarea placeholder="Wirte your thought here!"
                                    style={{backgroundColor: `${this.state.colors}`}} 
                                    value={this.state.userTyping}
                                    onChange={(e) => this.handleOnchange(e)}></textarea>
                                    <button style={{backgroundColor:`${this.state.colors}`}}>Post New</button>
                                </form>
                                {userNote.length > 0 ? userNote.map(note => {
                                return<Draggable 
                                                cancel=".btn"
                                                cancel={this.state.edit ? ".post" : ".btn"}
                                                onStop={(e , v) => this.handleOnStop(e, v, note)}
                                                    > 
                                                    <div className= "post" 
                                                    style={{backgroundColor:`${note.color}`, top:`${note.y}px`,
                                                    left: `${note.x}px`}}
                                                    key={note.id} 
                                                        >
                                                        {this.state.edit
                                                            ?<div className="btn" style={{fontSize:'24px', color:'white', textAlign:'right', paddingBottom: '20px'}}>     
                                                            <IoSave className="btn-edit" onClick={() => this.handleUpdateEdit(currentNote)}/>
                                                            <AiFillCloseSquare  className="btn-cancel"  onClick={() => this.handleCancleEdit()} />
                                                            </div>
                                                            :<div className="btn" style={{fontSize:'24px', color:'white', textAlign:'right', paddingBottom: '20px'}}>     
                                                                    <FaRegEdit className="btn-edit"  onClick={() => this.handleEditChange(note)}/>
                                                                    <RiDeleteBin6Line className="btn-cancel"  onClick={() => this.deleteNote(note)} />
                                                            </div>
                                                        }
                                                        <pre  className="post-text">{note.text}</pre> 
                                                    </div> 
                                                </Draggable> 
                                }) : null}                              
                                {this.state.edit
                                  ?<textarea className= "edit-textarea" 
                                  style={{backgroundColor:`${currentNote.color}`, top:`${parseInt(currentNote.y) + 60}px`,
                                  left: `${parseInt(currentNote.x) - 0.5}px`}}
                                  value={editTyping}
                                  onChange={(e) => this.handleEditTypingChange(e)}
                                      >     
                                      <div className="btn" style={{fontSize:'24px', color:'white', textAlign:'right', paddingBottom: '20px'}}>     
                                      </div>
                                  </textarea>
                                  :null
                                }
                            </div>
                        </div>
                    :this.props.history.push('/')
                }
            </div>
        )
    }
}