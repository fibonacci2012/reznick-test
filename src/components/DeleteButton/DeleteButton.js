import { Modal, Button } from 'react-bootstrap';
import {useState} from "react";


function DeleteButton(props) {
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    props.onDelete();
    setShowModal(false);
  }

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Видалити
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Видалення нотатки</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ви впевнені, що хочете видалити цю нотатку?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Нє, нє, нє
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Видалити к чорту
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;