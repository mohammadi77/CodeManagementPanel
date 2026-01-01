import "./Modal.css";

function Modal({ toggleModal, children }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">{children} </div>
    </div>
  );
}

export default Modal;
