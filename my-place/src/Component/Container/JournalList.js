import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function JournalList(props) {
  const date = new Date(props.journal.created_at)

    const handleEdit = () => {
      props.handleCurrentJouranl(props.journal)
        props.history.push('./journaledit')
    }

  
    const handlClickTitle = () => {
      if(props.handleDelete){
        props.handleCurrentJouranl(props.journal)
         props.history.push('./journaldetail')
      }
    }

    return (
        <div className="journal-list" >
          {props.journal.title !== ""
          ?<div className="journal-list-title" onClick={() => handlClickTitle()}>{props.journal.title}</div>
          :<li onClick={() => handlClickTitle()}>No Title</li>
          }
          <p onClick={() => handlClickTitle()}>{props.journal.content}</p>
            <div  className="journal-list-time-btn" >
            <div>{date.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'} )}</div>
            <div className="journal-list-edit-btn" onClick={() => handleEdit()} > <FaRegEdit style={{fontSize: '20px', marginBottom: '5px', marginRight: '5px'}} /> Edit</div>
            {props.handleDraftDelete
            ?<div className="journal-list-delet-btn" onClick={() => props.handleDraftDelete(props.journal)} > <RiDeleteBin6Line style={{fontSize: '20px', marginBottom: '5px', marginRight: '5px'}} />Delete</div>
            :<div className="journal-list-delet-btn" onClick={() => props.handleDelete(props.journal)} > <RiDeleteBin6Line style={{fontSize: '20px', marginBottom: '5px', marginRight: '5px'}}  />Delete</div>
            }
            </div>
          <hr class="dotted"></hr>
        </div>
    );
  } 

  export default JournalList;