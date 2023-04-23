import './NoteEditor.scss';
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "antd";

const NoteEditor = (props) => {
    const {activeNote, onNoteChange} = props;
    // set text on component rendering
    const [noteText, setNoteText] = useState(activeNote.text ?? '');

    // set text when click to note on NoteList component
    useEffect(() => {
        setNoteText(activeNote.text)
    }, [activeNote])

    // change text in textarea in real time
    const handleTextChange = (e) => {
        setNoteText(e.target.value);
    };

    // this function should change existing note text not create new note (send new note value and id to parent)
    const handleButtonClick = useCallback(() => {
        onNoteChange(activeNote.id, noteText)
    }, [activeNote.id, noteText, onNoteChange]);

    return (
        <div className="noteEditor__container">
            <textarea className="noteEditor__el__textArea" placeholder="Put your text" value={noteText}
                      onChange={handleTextChange}/>

            <Button className="noteEditor__btn__newNote" onClick={handleButtonClick}>Save note</Button>
        </div>
    );
};

export default NoteEditor;
