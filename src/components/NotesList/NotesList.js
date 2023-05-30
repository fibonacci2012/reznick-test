import './NotesList.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import imgTrash from "../../img/trash.png";
import classNames from "classnames";

const NotesList = (props) => {
    // notes as prop from parent component
    const {notes, setActiveNote, handleNoteDelete, listState} = props;

    return (
        <DragDropContext>
        <div className={classNames('noteList__thumbnails')}>
            {!!notes?.length && notes.map((note) => (
                <div key={note.id} className='noteList__el__wrapper'>
                    <div className='noteList__el' onClick={() => setActiveNote(note.id)}>
                        <div className='noteList__el__title'>
                            {(note.title.length < 10
                                ? note.title
                                : note.title.slice(0, 10) + '...')}
                        </div>
                        <div className='noteList__el__description'>
                            {(note.body.length < 10
                                ? ''
                                : note.body.slice(10, 20) + '...')}
                        </div>
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
</DragDropContext>
    );
};

export default NotesList;
