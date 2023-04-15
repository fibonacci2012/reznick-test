import React, { useState } from 'react';

const NoteEditor = ({onNoteAdd}) => {
  const [noteText, setNoteText] = useState('');
  const handleTextChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleButtonClick = () => {
    if (noteText.trim().length === 0) {
      return;
    }
    const now = new Date();
    const newNote = {
      id: now.getTime(),
      title: noteText.trim().split('\n')[0],
      text: noteText.trim(),
    };
    onNoteAdd(newNote);
    setNoteText('');
  };

  return (
    <div>
      <textarea
        placeholder="Write your note here"
        value={noteText}
        onChange={handleTextChange}
      />
      <button onClick={handleButtonClick}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
