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
            fetchNotes()
        }
        setNotes(data)
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

    // change note text value on save using map function and replace element with same id (you can find some different solution with findIndex for example)
    const handleNoteChange = (id, value) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    //before .trim work dynamically and cut every space or /n
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
        setIsList(true)
    }, [activeNoteID])

    //тупий костиль тому що, наскільки зрозумів, без нього activeNote
    // не встигає отримати дані, бо воно його не відрендерило ще
    // як пофіксити ще не дивився
    if (!notes) return setTimeout(() => {
        window.location.reload()
    }, 3000);

   const activeNote = notes.find(note => note.id === activeNoteID)

    // for now show editor only if note selected
    return (

        <div className="App">
        <Toolbar handleNoteDelete={handleNoteDelete}
                 activeNoteID={activeNoteID}
                 notes={notes}
                 setCreate={setCreate}
                 listState={listState}
        />
        <div className={classNames('contentContainer', [!isList && 'contentContainer__thumbnails'])}>
            <div className="sidebar">
                <NotesList handleNoteDelete={handleNoteDelete}
                           setActiveNote={handleSetActiveNoteID}
                           notes={notes}
                           handleNoteChange={handleNoteChange}
                           listState={isList}
                />
            </div>
            {(!!activeNoteID || create) && <NoteEditor
                create={create}
                activeNote={activeNote}
                onNoteChange={handleNoteChange}
                onNoteCreate={onNoteCreate}
                listState={isList}
            />}
        </div>
    </div>);
}

export default App;
