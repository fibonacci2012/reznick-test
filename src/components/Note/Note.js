import Card from 'react-bootstrap/Card';
import DeleteButton from './DeleteButton';

function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <DeleteButton onDelete={handleDelete} />
      </Card.Body>
    </Card>
  );
}

export default Note;
