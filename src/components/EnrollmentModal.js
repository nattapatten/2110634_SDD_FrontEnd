import React, { useEffect, useRef } from 'react';
import './EnrollmentModal.css';

function EnrollmentModal({ isOpen, onClose, onEnroll }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function keyListener(event) {
      if (event.keyCode === 27) {
        onClose();
      }
    }

    document.addEventListener('keydown', keyListener);

    if (isOpen) {
      modalRef.current.focus();
    }

    return () => document.removeEventListener('keydown', keyListener);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-enroll" style={{ display: 'flex' }} ref={modalRef} tabIndex="-1">
      <div className="modal-content-enroll container-purple">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <h2>Enroll in Course</h2>
              <p>Please confirm your enrollment.</p>
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-auto">
              <button onClick={onClose} className="btn btn-secondary">Close</button>
            </div>
            <div className="col-auto">
              <button onClick={onEnroll} className="btn btn-primary">Enroll Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentModal;
