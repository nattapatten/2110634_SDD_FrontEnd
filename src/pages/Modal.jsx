import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, handleClose, title, content, handleApply, image }) => {
  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {/* Back button to close the modal */}
          <button onClick={handleClose}>&lt; Back</button>
          {/* Title of the modal */}
          <h1>{title}</h1>
        </div>
        <div className="modal-body">
          {/* Left section for displaying the image */}
          <div className="modal-image">
            {/* Image tag with src attribute set to the image prop */}
            <img src={image} alt={`${title} Icon`} />
          </div>
          {/* Right section for displaying the content and apply button */}
          <div className="modal-description">
            {/* Description content */}
            <p>{content}</p>
            {/* Apply button */}
            <button className="modal-apply-button " onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
