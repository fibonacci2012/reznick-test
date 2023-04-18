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
        {id: 1, title: "Note 1", text: "asdasdasd"},
        {id: 2, title: "Note 2", text: "xzxczxczczxczxc"},
        {id: 3, title: "Note 3", text: "hjkhjkhjkhjkhjkhjk"}
    ]);

    const [activeNoteID, setActiveNoteID] = useState(0)

    const handleNoteDelete = (id) => {
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }

    // change note text value on save using map function and replace element with same id (you can find some different solution with findIndex for example)
    const handleNoteChange = (id, value) => {
        const updatedNotes = notes.map(note => {
            if(note.id === id) {
                return {
                    id: note.id,
                    text: value,
                    title: note.title
                }
            }
            return note
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };
    // for now show editor only if note selected
    return (
        <div className="App">
            <header className="toolbarContainer">
                <Toolbar/>
            </header>
            <div className="contentContainer">
                <div className="sidebar">
                    <NotesList handleNoteDelete={handleNoteDelete} setActiveNote={setActiveNoteID} notes={notes}/>
                </div>

                <div className="editorContainer">
                    {!!activeNoteID && <NoteEditor activeNote={notes.find(note => note.id === activeNoteID)} onNoteChange={handleNoteChange}/>}
                </div>
            </div>


        </div>
    );
}

export default App;
