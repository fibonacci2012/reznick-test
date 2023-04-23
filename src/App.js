import {useState, useEffect, useCallback} from 'react';
import NoteEditor from './components/NoteEditor/NoteEditor';
import './App.css';
import NotesList from "./components/NotesList/NotesList";
import {Button, Layout} from "antd";
import Toolbar from "./components/Toolbar/Toolbar";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/lib/layout/Sider";
import NoteService from "./components/API/NoteService";

function App() {
    const [notes, setNotes] = useState([
        {id: 1, title: "New note", text: ""},
        {id: 2, title: "Note 2", text: "xzxc\n"},
        {id: 3, title: "Note 3", text: "1234567890 \n abcdefghjkl"}
    ]);

    const [activeNoteID, setActiveNoteID] = useState(1)

    const handleNoteDelete = (id) => {
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }

    // change note text value on save using map function and replace element with same id (you can find some different solution with findIndex for example)
    const handleNoteChange = (id, value) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    id: note.id,
                    title: value.trim().split('\n')[0],
                    text: value.trim()

                }
            }
            return note
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    // toggle active note
    const handleSetActiveNoteID = useCallback((id) => {
        setActiveNoteID(activeNoteID === id ? 0 : id)
    }, [activeNoteID])
    const activeNote = notes.find(note => note.id === activeNoteID);
    // for now show editor only if note selected
    return (
        <div className="App">
            <Toolbar handleNoteDelete={handleNoteDelete} activeNote={activeNote} notes={notes}/>
            <div className="contentContainer">
                <div className="sidebar">
                    <NotesList handleNoteDelete={handleNoteDelete} setActiveNote={handleSetActiveNoteID} notes={notes}/>
                </div>
                {!!activeNoteID && <NoteEditor activeNote={activeNote}
                                               onNoteChange={handleNoteChange}/>}
            </div>


        </div>
    );
}

export default App;
