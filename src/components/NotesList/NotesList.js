import './NotesList.scss';
import classNames from "classnames";
import DeleteButton from "../DeleteButton/DeleteButton";
import {Link,} from "react-router-dom";
import {Draggable, Droppable} from "react-beautiful-dnd";
import NotesListItem from "../NoteListItem/NoteListItem";

const NotesList = (props) => {
    const {notes, setActiveNote, handleNoteDelete, listState, activeNoteID} = props;
const dropID = "drop-1";
    return (
        <Droppable droppableID={dropID}>
            {(provided) => (
                <ul innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    className={classNames("noteList", [!listState && "thumbnails"])}>
                    {!!notes?.length &&
                        notes.map((note, index) => (
                            <Draggable draggableId={index.toString()}>
                                {(provided) => (
                                    <li innerRef={provided.innerRef}
                                        {...provided.draggableProps}
                                        key={note.id}>
                                        <NotesListItem
                                            note={note}
                                            index={index}
                                            setActiveNote={setActiveNote}
                                            handleNoteDelete={handleNoteDelete}
                                            activeNoteID={activeNoteID}
                                            listState={listState}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}

                                {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
};

export default NotesList;
