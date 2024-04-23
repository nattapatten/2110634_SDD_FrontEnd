import React, { useEffect, useRef } from 'react';
import './EnrollmentModal.css';

function EnrollmentModal({ isOpen, onClose, onEnroll, courseID, studentID, enrollmentStatus }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function keyListener(event) {
      if (event.keyCode === 27) { // ESC key for closing modal
        onClose();
      }
    }

    document.addEventListener('keydown', keyListener);
    if (isOpen) {
      modalRef.current.focus(); // Set focus on the modal when open
    }

    return () => document.removeEventListener('keydown', keyListener);
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="modal-enroll" style={{ display: 'flex' }} ref={modalRef} tabIndex="-1">
      <div className="modal-content-enroll container-purple">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <h2>Enroll in Course</h2>
              <p>{enrollmentStatus.message || 'Please confirm your enrollment.'}</p>
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-auto">
              {enrollmentStatus.type === 'success' ? (
                <button onClick={onClose} className="btn btn-primary">OK</button>
              ) : (
                <>
                  <button onClick={() => onEnroll(courseID, studentID)} className="btn btn-primary">Enroll Now</button>
                  <button onClick={onClose} className="btn btn-secondary">Close</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentModal;
