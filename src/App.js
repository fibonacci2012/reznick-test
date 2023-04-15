import { useState, useEffect } from 'react';
import ListItem from './components/ListItem/ListItem';
import SearchBox from './components/SearchBox/SearchBox';
import Workspace from './components/Workspace/Workspace';
import Note from './components/Note/Note';
import DeleteButton from './components/DeleteButton/DeleteButton';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(notes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, content) => {
    const newNote = { id: uuidv4(), title, content };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Notes</h1>
      <SearchBox searchTerm={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <ListItem>
        {filteredNotes.map((note) => (
          <Note key={note.id} title={note.title} content={note.content}>
            <DeleteButton onDelete={() => deleteNote(note.id)} />
          </Note>
        ))}
      </ListItem>
      <Workspace onAddNote={addNote} />
    </div>
  );
}

export default App;
