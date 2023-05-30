import './NotesList.scss';
import {DragDropContext} from 'react-beautiful-dnd';
import imgTrash from "../../img/trash.png";
import classNames from "classnames";

const NotesList = (props) => {
    const {notes, setActiveNote, handleNoteDelete, listState, activeNoteID} = props;
    let i = 1;

    return (
        <DragDropContext>

            <div
                className={classNames('noteList', [!listState && 'thumbnails'])}>
                {!!notes?.length && notes.map((note) => (
                    listState
                        ? <div key={note.id}
                               className={classNames('noteList__el__wrapper', [(note.id === activeNoteID) && 'selectedNote'])}>
                            <div className='noteList__el' onClick={() => setActiveNote(note.id)}>
                                <div className='noteList__el__title'>
                                    {(note.title.length < 15
                                        ? note.title
                                        : note.title.slice(0, 15) + '...')}
                                </div>
                                <div className='noteList__el__description'>
                                    {(note.body < 15
                                        ? note.title
                                        : note.body.slice(15))}
                                </div>
                            </div>
                            <img
                                className='noteList__el__delete'
                                src={imgTrash}
                                alt={note.id}
                                onClick={() => handleNoteDelete(note.id)}
                            />

                        </div>
                        : <div key={note.id}
                               className={classNames('noteList__el__wrapper', [(note.id === activeNoteID) && 'selectedNote'])}>
                            <div className='noteList__el__thumbnails' onClick={() => setActiveNote(note.id)}>
                                <div className='noteList__el__body'>
                                    {(i++)}
                                </div>
                            </div>
                        </div>

                ))}
            </div>
        </DragDropContext>
    );
};

export default NotesList;
