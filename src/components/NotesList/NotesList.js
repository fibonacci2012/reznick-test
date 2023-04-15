import './NotesList.css';
function NotesList(props) {
  const { notes } = props;

  return (
    <div className="notesList">
      {notes.map((note, index) => (
        <div key={index}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
