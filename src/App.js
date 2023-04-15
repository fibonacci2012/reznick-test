import { useState, useEffect } from 'react';
// import SearchBox from './components/SearchBox/SearchBox';
// import Workspace from './components/Workspace/Workspace';
import NoteEditor from './components/NoteEditor/NoteEditor';
// import DeleteButton from './components/DeleteButton/DeleteButton';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import NotesList from "./components/NotesList/NotesList";

function App() {
const [notes, setNotes] = useState([]);
function handleNoteDelete (id) {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }
  const handleNoteAdd = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  return (
    <div className="App">
      <NoteEditor onNoteAdd={handleNoteAdd}/>
        <NotesList notes={notes} onDelete={handleNoteDelete}/>
    </div>
  );
}

export default App;
