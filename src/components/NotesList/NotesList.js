import './NotesList.scss';
import classNames from "classnames";
import DeleteButton from "../DeleteButton/DeleteButton";
import {Link,} from "react-router-dom";
import {Draggable, Droppable} from "react-beautiful-dnd";

const NotesList = (props) => {
    const {notes, setActiveNote, handleNoteDelete, listState, activeNoteID} = props;

    return (
        <Droppable
            droppableID="droppable">
            {(provided) => (
                <ul
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}>
                    <div
                        className={classNames('noteList', [!listState && 'thumbnails'])}>
                        {!!notes?.length && notes.map((note, index) => (
                            listState
                                ? <Draggable key={notes} draggableID={note.id} index={index}>
                                    {(provided) => (
                                        <li innerRef={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Link to={`/note/${note.id}`}>
                                                <div draggable={true}
                                                     key={note.id}
                                                     className={classNames('noteList__el__wrapper',
                                                         [(note.id === activeNoteID) && 'selectedNote'])}>
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
                                                    <DeleteButton
                                                        activeNoteID={note.id}
                                                        handleNoteDelete={handleNoteDelete}
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                </Draggable>
                                : <Draggable key={notes} draggableID={note.id} index={index}>
                                    {(provided) => (
                                        <li {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            innerRef={provided.innerRef}>
                                            <Link to={`/note/${note.id}`}>
                                                <div key={note.id}
                                                     className={classNames('noteList__el__wrapper',
                                                         [(note.id === activeNoteID) && 'selectedNote'])}>
                                                    <div className='noteList__el__thumbnails'
                                                         onClick={() => setActiveNote(note.id)}>
                                                        <div className='noteList__el__body'>
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                </Draggable>
                        ))}
                    </div>
                    {provided.placeholder}
                </ul>
            )};
        </Droppable>
    );
};

export default NotesList;
