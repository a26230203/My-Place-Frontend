import React, { useState } from 'react';
import JournalEdit from './JouranlEdit';

function JournalList(props) {

    const handleEdit = () => {
        <JournalEdit journal={props.journal}/>
        props.history.push('./journaledit')
    }



    return (
        <div className="journal-list">
          <li>{props.journal.title}</li>
          <li>{props.journal.created_at}</li>
          <button onClick={() => handleEdit()}>edit</button>
          <button onClick={() => props.handleDelete(props.journal)}>delete</button>
        </div>
    );
  }

  export default JournalList;