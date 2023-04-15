import React, { useState, useEffect } from 'react';

const NoteEditor = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
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

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setNoteBody(event.target.value);
  };

  const handleSaveClick = () => {
    const id = Date.now().toString();
    const newNote = {
      id: id,
      title: noteTitle,
      text: noteBody
    };
    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteBody('');
  };

  return (
    <div>
      <input type="text" placeholder="Заголовок" value={noteTitle} onChange={handleTitleChange} />
      <textarea placeholder="Текст нотатки" value={noteBody} onChange={handleBodyChange} />
      <button onClick={handleSaveClick}>Зберегти</button>
    </div>
  );
};

export default NoteEditor;
