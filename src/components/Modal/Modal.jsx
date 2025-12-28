import "./Modal.css";
import React from "react";
import AddTransationModal from "../AddTransationModal/AddTransationModal";

function Modal({ toogleModal }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={toogleModal}></div>
      <div className="modal-content">
        <AddTransationModal toogleModal={toogleModal} />
      </div>
    </div>
  );
}

export default Modal;
