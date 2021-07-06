import React, { Component } from "react";
import { Select } from 'antd';
import Draggable from 'react-draggable'; 
import {  CloseOutlined, EditFilled } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react'


const { Option } = Select;
const maxWidth = window.innerWidth
const maxHeight = window.innerHeight
export default class Sticky extends Component{

    state = {
        edit: false,
        userTyping: "",
        currentSticky: {},
        stickies: [],
        colors: '#FFCC00',
        x: parseInt((maxWidth - 250) * Math.random(), 10),
        y: parseInt((maxHeight - 350) * Math.random(), 10)
    }

    generatorSticky = (text) => {
        let randX = parseInt((maxWidth - 250) * Math.random(), 10)
        let randY = parseInt((maxHeight - 350) * Math.random(), 10)
        let background = this.state.colors
        let rotate = Math.floor(Math.random() * 20)
        this.setState({
            x: randX,
            y: randY

        })
        let sticky = {
            text,
            background,
            top: this.state.y,
            left: this.state.x,
            rotate: rotate
        }
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
        // console.log(this.state.currentSticky)
        const {currentSticky} = this.state
        return(
            <div>
                <div className="sticky-page" >
                This is sticky page
                    <form onSubmit={(e) => this.addStikcy(e)} className="sticky">
                        <Select defaultValue='Select color' style={{ width: 200 }} onChange={this.handleSelectChange}>
                        <Option value='Select color' disabled>Select color</Option>
                        <Option value='#96C2F1'>Blue</Option>
                        <Option value='#D5F1BB'>Green</Option>
                        <Option value='#E3E197'>Yellow</Option>
                        <Option value='#FFCC00'>Orange</Option>
                        </Select> 

                        <textarea placeholder="Wirte your memo here!"
                        style={{backgroundColor: `${this.state.colors}`}} 
                        value={this.state.userTyping}
                        onChange={(e) => this.handleOnchange(e)}></textarea>
                        <button>Add New</button>
                    </form>

                    {this.state.stickies.map(sticky => {
                        return <div style={{ width: "300px", height: "300px", transform: `rotate(${sticky.rotate}deg)`}}> 
                                            <Draggable 
                                            onStop={this.handleOnStop}>
                                            <div className="post" 
                                            style={{backgroundColor:`${sticky.background}`, top:`${sticky.top}px`,
                                            left: `${sticky.left}px`, transform: `rotate(${sticky.rotate}deg)`}}
                                            key={sticky.id} 
                                                >     
                                                <div className="btn" style={{fontSize:'24px', color:'white', textAlign:'right', paddingBottom: '20px'}}>     
                                                    <CloseOutlined style={{paddingLeft: '15px'}}/>
                                                </div>
                                                <pre  className="post-text">{sticky.text}</pre> 
                                            </div>
                                            </Draggable>
                                </div>                                 
                    })}
                  </div>
            </div>
        )
    }
}