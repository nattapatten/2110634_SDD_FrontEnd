import React from 'react';
import './Modal1.css';
import Tokjai from '../assets/Tokjai.png';

const Modal1 = ({ isOpen, handleClose, handleConfirm, title, content, showConfirmation }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose}>&lt; Back</button>
        </div>
        {/* Conditional rendering for confirmation content */}
        {showConfirmation ? (
          <>
            <div className="modal-body">
            <img src={Tokjai} alt="Tokjai" className="modal-image" />
            <p style={{ color: '#FFB900', fontWeight: 700, fontSize: '32px' }}>Are you sure?</p>
              <p style={{ color: '#7949FF', fontSize: '20px' }}>You've select {title} </p>
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
