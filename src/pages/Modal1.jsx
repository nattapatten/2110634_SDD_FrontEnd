import React from 'react';
import './Modal1.css';

const Modal1 = ({ isOpen, handleClose, handleConfirm, title, content, showConfirmation }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose}>Back</button>
          <h1>{title}</h1>
        </div>
        {/* Conditional rendering for confirmation content */}
        {showConfirmation ? (
          <>
            <div className="modal-body">
              <p>Are you sure you want to apply for the {title} path?</p>
            </div>
            <button className="modal-confirm-button" onClick={handleConfirm}>Yes, I'm sure</button>
            <button className="modal-cancel-button" onClick={handleClose}>Cancel</button>
          </>
        ) : (
          <>
            <div className="modal-body">
              <p>{content}</p>
            </div>
            <button className="modal-apply-button" onClick={handleClose}>Apply</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal1;
