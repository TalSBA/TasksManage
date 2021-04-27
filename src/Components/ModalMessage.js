import { Button, Modal } from "react-bootstrap";

function ModalMessage({ show, onCloseModal, message, title, task }) {
  return (
    <>
      <Modal
        show={show}
        onHide={(e) => onCloseModal(e, task)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message + " " + task.value + "?"}</Modal.Body>
        <Modal.Footer>
          <Button id="cancle" variant="secondary" onClick={(e) => onCloseModal(e, task)}>
            Cancle
          </Button>
          <Button id="ok" variant="primary" onClick={(e) => onCloseModal(e, task)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMessage;
