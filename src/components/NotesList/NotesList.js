import './NotesList.scss';
import React, {useState, useEffect} from 'react';
import {Button, Card, List, Popconfirm} from "antd";
import NoteService from "../API/NoteService";
import imgTrash from "../../img/trash.png";

const NotesList = (props) => {
    // notes as prop from parent component
    const {notes, setActiveNote, handleNoteDelete} = props;

    return (

        <div className='noteList__wrapper'>
            {notes.map((note) => (
                <div key={note.id} className='noteList__el__wrapper'>
                    <div className='noteList__el' onClick={() => setActiveNote(note.id)}>
                        {(note.title.length < 10
                            ? note.title
                            : note.title.slice(0, 10) + '...')}
                        <div
                            className='noteList__el__description'>{
                            (note.text.length < 10
                                ? note.text
                                : note.text.slice(10, 20) + '...')}</div>
                    </div>
                    <img
                        className='noteList__el__delete'
                        src={imgTrash}
                        alt={note.id}
                        onClick={() => handleNoteDelete(note.id)}
                    />
                </div>

            ))}
        </div>

    );
};

export default NotesList;
