import {useState, useEffect, useCallback} from 'react';
import NoteEditor from './components/NoteEditor/NoteEditor';
import './App.css';
import NotesList from "./components/NotesList/NotesList";
import Toolbar from "./components/Toolbar/Toolbar";
import NoteService from "./components/API/NoteService";
import classNames from "classnames";

function App() {
    const [notes, setNotes] = useState([]);
    const [isList, setIsList] = useState(true)
    const listState = (listState) => {
        setIsList(listState)
    };
    const [activeNoteID, setActiveNoteID] = useState(0)
    const [create, setCreate] = useState(false)

    async function fetchNotes() {
        const notes = await NoteService.getAll();
        localStorage.setItem('notes', JSON.stringify(notes.data))
    }

    function getLocalStorageNotes() {
        const data = JSON.parse(localStorage.getItem('notes'))
        if (!data) {
            // fetchNotes()
        }
        setNotes(!!data ? data : [])
        // а чому б тоді тут не зробити:
        // setNotes(data || []);
        // ?
    }

    useEffect(() => {
        getLocalStorageNotes()
    }, []);
    const handleNoteDelete = (id) => {
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
        setActiveNoteID(0)
    }

    const handleNoteChange = (id, value) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    id: note.id,
                    title: value,
                    body: value

                }
            }
            return note
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };
    const onNoteCreate = (value) => {
        const newNote = {id: new Date().getTime(), title: value, body: value}
        let newNotes = notes
        newNotes.push(newNote)
        setNotes(newNotes);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        setCreate(false)
        handleSetActiveNoteID(newNote.id)
    };

    // toggle active note
    const handleSetActiveNoteID = useCallback((id) => {
        setActiveNoteID(activeNoteID === id ? 0 : id)
    }, [activeNoteID])

    const activeNote = useCallback(() => notes?.find(note => note.id === activeNoteID), [notes, activeNoteID])

    // for now show editor only if note selected
    return (

        <div className="App">
            <Toolbar handleNoteDelete={handleNoteDelete}
                     activeNoteID={activeNoteID}
                     notes={notes}
                     setCreate={() => {
                         setCreate(true)
                         setActiveNoteID(0)
                     }}
                     listState={listState}
            />
            <div className={classNames('contentContainer')}>
                <div className="sidebar">
                    <NotesList handleNoteDelete={handleNoteDelete}
                               setActiveNote={handleSetActiveNoteID}
                               notes={notes}
                               handleNoteChange={handleNoteChange}
                               listState={isList}
                               activeNoteID={activeNoteID}
                    />
                </div>
                {(!!activeNoteID || create) && <NoteEditor
                    create={create}
                    activeNote={activeNote()}
                    onNoteChange={handleNoteChange}
                    onNoteCreate={onNoteCreate}
                />}
            </div>
        </div>);
}

export default App;
