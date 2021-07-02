import { Card, Upload, Modal, Form, Button } from 'antd'
import React, { Component } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default class Test extends React.Component{ 


}
//   constructor(props){
//     super(props);
//   }
//   state = {
//     previewVisible:false,
//     previewImage:'',
//     fileList:[],
//     upFiles:[]
//   };
  
//   // handleCancel=()=>{
//   //   this.setState({previewVisible:false});
//   // }
   
//   // handlePreview = async file =>{
//   //   if(!file.url && !file.preview){
//   //     file.preview = await getBase64(file.originFileObj);
//   //   }
//   //   this.setState({
//   //     previewImage: file.url || file.preview,
//   //     previewVisible: true
//   //   });
//   // }
  
//   // handleChange = (info) => {
//   //   this.setState({fileList: info.fileList});
//   // }
  
//   beforeUpload = (file) => {
//     const {upFiles} = this.state;
//     upFiles.push(file);
//     this.setState({upFiles: upFiles});
//   }
  
//   addOk = () => {
//     const {upFiles, id} = this.state;
//     const formData = new FormData();
//     upFiles.forEach((file) => {
//       formData.append('file', file);
//     });
//     formData.append('id', id);
//     this.props.dispatch({
//       type: 'upload/upImage',
//       payload: {formData: formData}
//     })
//   }
  
//   render() {
//     const {previewVisible, previewImage, fileList} = this.state;
//     // const uploadButton = (
//     //   <div>
//     //     <Icon type="plus" />
//     //     <div className="ant-upload-text">Upload</div>
//     //   </div>
//     // )
//     return (
//       <div>
//         <Button type="primary" onClick={this.addOk()}>确认</Button>
//         <Upload
//           accept=".png,,jpg,.jpeg,.pdf"
//           listType="picture-card"
//           multiple={true}
//           fileList={fileList}
//           onChange={this.handleChange}
//           onPreview={this.handlePreview}
//           beforeUpload={this.beforeUpload}
//         >
//         <PlusOutlined />
//         </Upload>
//         <Modal visble={previewVisible} footer={null} onCancel={this.handleCancel()}>
//           <img alt="example" style={{width:'100%'}} src={previewImage}/>
//         </Modal>
//       </div>
//     )
//   }
// }

// // function getBase64(file){
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.readAsDataURL(file);
// //     reader.onload = () => resolve(reader.result);
// //     reader.onerror = error => reject(error);
// //   });
// // }
