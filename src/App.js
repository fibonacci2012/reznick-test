import {useState, useEffect, useCallback} from 'react';
import NoteEditor from './components/NoteEditor/NoteEditor';
import './App.css';
import NotesList from "./components/NotesList/NotesList";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
    const [notes, setNotes] = useState([]);

    const [activeNoteID, setActiveNoteID] = useState(0)
    const [create, setCreate] = useState(false)

    const handleNoteDelete = (id) => {
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
        setActiveNoteID(0)
    }

    // change note text value on save using map function and replace element with same id (you can find some different solution with findIndex for example)
    const handleNoteChange = (id, value) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    //before .trim work dynamically and cut every space or /n
                    id: note.id,
                    title: value,
                    text: value

                }
            }
            return note
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };
    const onNoteCreate = (value) => {
        const newNote = {id: new Date().getTime(), title: value, text: value}
        const newNotes = [...notes, newNote]
        setNotes([...notes, {id: new Date().getTime(), title: value, text: value}]);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        setCreate(false)
        handleSetActiveNoteID(newNote.id)
    };

    // toggle active note
    const handleSetActiveNoteID = useCallback((id) => {
        setActiveNoteID(activeNoteID === id ? 0 : id)
    }, [activeNoteID])

    const activeNote = notes.find(note => note.id === activeNoteID);
    // for now show editor only if note selected
    return (
        <div className="App">
            <Toolbar handleNoteDelete={handleNoteDelete} activeNoteID={activeNoteID} notes={notes} setCreate={setCreate}/>
            <div className="contentContainer">
                <div className="sidebar">
                    <NotesList handleNoteDelete={handleNoteDelete} setActiveNote={handleSetActiveNoteID} notes={notes}
                               handleNoteChange={handleNoteChange}/>
                </div>
                {(!!activeNoteID || create) &&
                    <NoteEditor
                        create={create}
                        activeNote={activeNote}
                        onNoteChange={handleNoteChange}
                        onNoteCreate={onNoteCreate}
                    />}
            </div>
        </div>
    );
}

export default App;
