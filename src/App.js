import {useState, useEffect} from 'react';
import NoteEditor from './components/NoteEditor/NoteEditor';
import './App.css';
import NotesList from "./components/NotesList/NotesList";
import axios from "axios";
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
    const notesArr = localStorage.getItem('notes');
    async function fetchNotes() {
        const notes = await NoteService.getAll();
        setNotes(notes.data)
    };
    return (
        <div className="App">
            <Layout>
                <Header className="headerStyle">
                    <Toolbar></Toolbar>
                </Header>
                <Sider className="siderStyle">
                    <NotesList notes={notes}/>
                </Sider>
                <Layout>

                    <Content className="contentStyle">
                        <NoteEditor onNoteAdd={handleNoteAdd}/>
                    </Content>
                </Layout>
            </Layout>


        </div>
    );
}

export default App;
