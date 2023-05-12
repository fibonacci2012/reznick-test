import './NoteEditor.scss';
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "antd";
import classNames from "classnames";

const NoteEditor = (props) => {
    const {activeNote, onNoteChange, create, onNoteCreate, listState} = props;
    // set text on component rendering
    const [noteText, setNoteText] = useState(activeNote?.body ?? '');

    // set text when click to note on NoteList component
    useEffect(() => {
        if (!!activeNote) {
            setNoteText(activeNote.body)
        } else {
            setNoteText('')
        }
    }, [activeNote])

    // change text in NoteList in real time
    const handleTextChange = (e) => {
        setNoteText(e.target.value);
        onNoteChange(activeNote.id, e.target.value)
    };
    const handleNewTextChange = (e) => {
        onNoteCreate(e.target.value)
    };

    // this function should change existing note text not create new note (send new note value and id to parent)
    const handleButtonClick = useCallback(() => {
        onNoteChange(activeNote.id, noteText)
    }, [activeNote?.id, noteText, onNoteChange]);

    return (
        <div
            className={classNames('noteEditor__container', [listState && 'noteEditor_active'], [!listState && 'noteEditor_deactivated'])}
        >
            <div className="noteEditor__container__wrapper">
                <textarea className="noteEditor__el__textArea" placeholder="Put your text" value={noteText}
                          onChange={create ? handleNewTextChange : handleTextChange}/>
            </div>
            {/*<div className="noteEditor__container__wrapper">*/}
            {/*    <Button onClick={handleButtonClick}>Save note</Button>*/}
            {/*</div>*/}
        </div>
    )

};

export default NoteEditor;
