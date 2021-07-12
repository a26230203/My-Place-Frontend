import React, {Component} from "react";
import {CloseCircleOutlined } from '@ant-design/icons';

export default class Photo3D extends Component {
    state = {
        lastX: "" , 
        lastY: "" ,
        nowX: "", 
        nowY: "", 
        minX: "", 
        minY: "", 
    }

    handleMouseDown = (e) => {
        this.setState({
            lastX: e.clientX,
            lastY: e.clientY
        })

        console.log(this.state.lastX)
     }
 
     handleOnMouseMove = (e) => {
         const {nowX, nowY, lastX, lastY, minX, minY} = this.state
         this.setState({
            nowX: e.clientX,
            nowY: e.clientY,
            minX: (nowX - lastX) * 0.2,
            minY: (nowY - lastY) * 0.01,
         })
     } 


    render() {
        const length = this.props.photos.length;
        const deg = 360 / length
        const {minX, minY} = this.state
        return(
            <div>
                {this.props.view
                ?null
                :<div className="view-card-page" >
                <CloseCircleOutlined className="view-btn" style={{fontSize: '30px'}} onMouseDown={() => this.props.handleVeiew()}/>
                <div className="view-card" onMouseDown={(e) => this.handleMouseDown(e)}  onMouseMove={(e) => this.handleOnMouseMove(e)} style={{transform: `rotateX(${-minY}deg) rotateY(${-minX}deg)` , transition: '3s'}}>
                {
                    this.props.photos.map((photo, index) => {
                        return<img className="view-card-photo" src={photo.image} style={{transform: `rotateY(${index * deg}deg) translateZ(350px)`, transition: `1s ${(length - 1 - index) * 0.1}s`}} draggable = "false"
                        key={index}   
                        />
                    })
                }
                </div>
                </div>
                }
            </div>
        )
    }
}