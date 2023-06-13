// NotesListItem.js

import React from "react";
import classNames from "classnames";
import DeleteButton from "../DeleteButton/DeleteButton";
import {Link} from "react-router-dom";

const NotesListItem = (props) => {
    const {note, index, setActiveNote, handleNoteDelete, activeNoteID, listState,} = props
    const handleClick = () => {
        setActiveNote(note.id);
    };

    return (
        <Link to={`/note/${note.id}`}>
            <div
                className={classNames("noteList__el__wrapper", [note.id === activeNoteID && "selectedNote"])}
            >
                {listState ? (
                    <div className="noteList__el" onClick={handleClick}>
                        <div className="noteList__el__title">
                            {note.title.length < 15 ? note.title : note.title.slice(0, 15) + "..."}
                        </div>
                        <div className="noteList__el__description">
                            {note.body < 15 ? note.title : note.body.slice(15)}
                        </div>
                    </div>
                ) : (
                    <div className="noteList__el__thumbnails" onClick={handleClick}>
                        <div className="noteList__el__body">{index + 1}</div>
                    </div>
                )}
                <DeleteButton activeNoteID={note.id} handleNoteDelete={handleNoteDelete}/>
            </div>
        </Link>
    );
};

export default NotesListItem;
