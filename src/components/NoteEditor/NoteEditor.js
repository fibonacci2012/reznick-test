import './NoteEditor.css';
import React, { useState } from 'react';
import {Button} from "antd";

const NoteEditor = ({onNoteAdd}) => {
  const [noteText, setNoteText] = useState('');
  const handleTextChange = (e) => {
    setNoteText(e.target.value);
  };
//Тут при кліці обрізає першу строку і виводить її як заголовок до нотатки та зберігає її у масив
  const handleButtonClick = () => {
    if (noteText.trim().length === 0) {
      return;
    }
    const now = new Date();
    const newNote = {
      id: now.getTime(),
      title: noteText.trim().split('\n')[0],
      body: noteText.trim(),
    };
    onNoteAdd(newNote);
    setNoteText('');
  };

  return (
    <div className="noteEditor__container">
      <textarea placeholder="Put your text"  value={noteText} onChange={handleTextChange}/>

      <Button className="newNote__btn" onClick={handleButtonClick}>Save Note</Button>
    </div>
  );
};

export default NoteEditor;
