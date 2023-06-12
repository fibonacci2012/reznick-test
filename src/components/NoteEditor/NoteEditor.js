import './NoteEditor.scss';
import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";

const NoteEditor = (props) => {
    const {activeNote, onNoteChange, create, onNoteCreate, listState} = props;
    const [noteText, setNoteText] = useState(activeNote?.body ?? '');
    useEffect(() => {
        if (!!activeNote) {
          setNoteText(activeNote.body)
        } else {
          setNoteText('')
        }
    }, [activeNote])
    const handleTextChange = (e) => {
        setNoteText(e.target.value);
        onNoteChange(activeNote.id, e.target.value)
    };
    const handleNewTextChange = (e) => {
        onNoteCreate(e.target.value)
    };

    return (
        <div className={classNames('noteEditor__container', [!listState && 'noteEditor_deactivated'])}>
            <div className="noteEditor__container__wrapper">
            <textarea className="noteEditor__el__textArea" placeholder="Any of your awful thoughts must be here..." value={noteText}
                      onChange={create ? handleNewTextChange : handleTextChange}/>
            </div>
        </div>
    )

};

export default NoteEditor;
