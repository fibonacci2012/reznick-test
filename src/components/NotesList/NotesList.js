import './NotesList.scss';
import React, {useState, useEffect} from 'react';
import {Button, Card, List, Popconfirm} from "antd";
import NoteService from "../API/NoteService";
import imgTrash from "../../rsc/img/trash.png";

const NotesList = (props) => {
  // notes as prop from parent component
  const {notes, setActiveNote, handleNoteDelete} = props;


  const cancel = () => console.log('No')


  return (

    <div className='noteList__wrapper'>
      {notes.map((note) => (
        <div key={note.id} className='noteList__el__wrapper'>
          <div className='noteList__el' onClick={() => setActiveNote(note.id)}>
            {note.title}
            <div className='noteList__el__description'>{note.text.slice(0, 10) + '...'}</div>
          </div>
          <img
            className='noteList__el__delete'
            src={imgTrash}
            alt={note.id}
            onClick={() => handleNoteDelete(note.id)}
          />
        </div>

      ))}
    </div>

  );
};

export default NotesList;
