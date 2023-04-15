import './ListItem.css';
function ListItem(props) {
  const { notes } = props;

  return (
    <div>
      {notes.map((note, index) => (
        <div key={index}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ListItem;
