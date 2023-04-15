import React, { useState, useEffect } from 'react';
import './Workspace.css';

function Workspace(props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const storedText = localStorage.getItem('noteText');
    if (storedText) {
      setText(storedText);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = { title, text };
    props.onAdd(newNote);
    setTitle('');
    setText('');
    localStorage.removeItem('noteText');
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem('noteText', newText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Note text"
        value={text}
        onChange={handleTextChange}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default Workspace;
