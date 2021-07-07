import React, { Component } from "react";
import { Select } from 'antd';
import Draggable from 'react-draggable'; 
import {  CloseOutlined, EditFilled } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react'


const { Option } = Select;
export default class Sticky extends Component{

    state = {
        edit: false,
        userTyping: "",
        currentSticky: {},
        stickies: [],
        colors: '#FFCC00',
        x: "", 
        y: ""
    }
    // parseInt((maxHeight - 100) * Math.random())
    generatorSticky = (text) => {
        const maxWidth = window.innerWidth
        const maxHeight = window.innerHeight
        let randX = parseInt((maxWidth - 250) * Math.random())
        let randY = parseInt((maxHeight - 350) * Math.random())
        let background = this.state.colors
        let sticky = {
            text,
            background,
            top: randX,
            left: randY
        }
        console.log(randX)
        return sticky
    }


    addStikcy = (e) => {
        e.preventDefault()
        let newSticky = this.generatorSticky(e.target[1].value)

        this.setState({
            userTyping: "",
            stickies: [...this.state.stickies, newSticky]
        })
    }

    deleteSticky = (stickyObj) => {
        const updateStikcyObj = this.state.stickies.filter(sticky => sticky.id !== stickyObj.id )
        this.setState({
            stickies: updateStikcyObj
        })
    }

    handleSelectChange = (e) => {
        this.setState({
            colors: e
        })
    }

    handleOnchange = (e) => {
        this.setState({
            userTyping: e.target.value
        })
    }

    handleOnStop = (e, v) => {
        console.log(v)
    }

    render() {
        const {currentSticky} = this.state
        return(
            <div>
                <div className="sticky-page" >
                    <form onSubmit={(e) => this.addStikcy(e)} className="sticky">
                        <Select defaultValue='Select color' style={{ width: 200, backgroundColor: `${this.state.colors}` }} onChange={this.handleSelectChange}>
                        <Option style={{ width: 200 }} value='Select color' disabled>Select color</Option>
                        <Option style={{backgroundColor:`#96C2F1` }} value='#96C2F1'>Blue</Option>
                        <Option style={{backgroundColor:`#D5F1BB` }} value='#D5F1BB'>Green</Option>
                        <Option style={{backgroundColor:`#E3E197` }} value='#E3E197'>Yellow</Option>
                        <Option style={{backgroundColor:`#FFCC00` }} value='#FFCC00'>Orange</Option>
                        </Select> 

                        <textarea placeholder="Wirte your memo here!"
                        style={{backgroundColor: `${this.state.colors}`}} 
                        value={this.state.userTyping}
                        onChange={(e) => this.handleOnchange(e)}></textarea>
                        <button style={{backgroundColor:`${this.state.colors}`}}>Add New</button>
                    </form>

                    {this.state.stickies.map(sticky => {
                        return <Draggable 
                                    onStop={this.handleOnStop}
                                    > 
                                    <div className= "post" 
                                    style={{backgroundColor:`${sticky.background}`, top:`${sticky.top}px`,
                                    left: `${sticky.left}px`}}
                                    key={sticky.id} 
                                        >     
                                        <div className="btn" style={{fontSize:'24px', color:'white', textAlign:'right', paddingBottom: '20px'}}>     
                                            <CloseOutlined style={{paddingLeft: '15px'}}/>
                                        </div>
                                        <pre  className="post-text">{sticky.text}</pre> 
                                    </div>
                               </Draggable>                              
                    })}
                  </div>
            </div>
        )
    }
}