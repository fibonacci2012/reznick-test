import './NotesList.scss';
import classNames from "classnames";
import DeleteButton from "../DeleteButton/DeleteButton";
import {Link,} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import NotesListItem from "../NoteListItem/NoteListItem";

const NotesList = (props) => {
    const {notes, setActiveNote, handleNoteDelete, listState, activeNoteID, setNotes} = props;
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            notes,
            result.source.index,
            result.destination.index
        );
        console.log(items)

        setNotes(items)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    return (
        <DragDropContext
            onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <ul {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classNames("noteList", [!listState && "thumbnails"])}>
                        {!!notes?.length &&
                            notes.map((note, index) => (
                                <Draggable index={index} key={note.id} draggableId={note.dragKey}>
                                    {(providedInner) => (
                                        <li ref={providedInner.innerRef}
                                            {...providedInner.draggableProps}
                                            {...providedInner.dragHandleProps}
                                            key={note.id}
                                        >
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
        </DragDropContext>

    );
};

export default NotesList;
