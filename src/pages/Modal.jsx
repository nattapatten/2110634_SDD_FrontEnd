// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, handleClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} >&lt; Back</button>
          <h1>{title}</h1>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <button className="modal-apply-button" onClick={handleClose}>Apply</button>
      </div>
    </div>
  );
};

export default Modal;
