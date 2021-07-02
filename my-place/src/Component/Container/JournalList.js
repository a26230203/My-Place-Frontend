import React, { useState } from 'react';

function JournalList(props) {
  const date = new Date(props.journal.created_at)

    const handleEdit = () => {
      props.handleCurrentJouranl(props.journal)
        props.history.push('./journaledit')
    }

    const handlClickTitle = () => {
      props.handleCurrentJouranl(props.journal)
      props.history.push('./journaldetail')
    }

    return (
        <div className="journal-list">
          {props.journal.title !== ""
          ?<li onClick={() => handlClickTitle()}>{props.journal.title}</li>
          :<li onClick={() => handlClickTitle()}>No Title</li>
          }
          <li>{date.toLocaleDateString()}</li>
          <button onClick={() => handleEdit()}>Edit</button>
          <button onClick={() => props.handleDelete(props.journal)}>Delete</button>
        </div>
    );
  }

  export default JournalList;