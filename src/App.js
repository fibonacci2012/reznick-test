import {useState, useEffect} from 'react';
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
        {id: 2, title: "javascript", text: "asdff"}
    ]);
    const handleNoteDelete = (id) => {
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
            <header className="toolbarContainer">
                <Toolbar></Toolbar>
            </header>
            <div className="contentContainer">
                <div className="sidebar">
                    <NotesList notes={notes}/>
                </div>
                <div className="editorContainer">
                    <NoteEditor onNoteAdd={handleNoteAdd}/>
                </div>
            </div>


        </div>
    );
}

export default App;
