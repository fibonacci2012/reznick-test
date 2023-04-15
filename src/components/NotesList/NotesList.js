import './NotesList.css';
import React, { useState, useEffect } from 'react';
import NoteEditor from "../NoteEditor/NoteEditor";

const NotesList = () => {
const [notes, setNotes] = useState([]);

useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleNoteAdd = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };


  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
