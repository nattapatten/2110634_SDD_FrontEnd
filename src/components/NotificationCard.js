import React, { useState } from 'react';
import './NotificationCard.css'; // Import CSS file for styling
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NotificationCard = ({ title, description, courseID }) => {
  const [show, setShow] = useState(false);

  // Function to handle opening the modal
  const handleShow = () => setShow(true);

  // Function to handle closing the modal
  const handleClose = () => setShow(false);

  // Function to trim the description to 100 characters for the main view
  const trimDescription = (text) => {
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  return (
    <div className='noti-container container-grey2'>
        <p className='noti-title'>{courseID} - {title}</p>
        <p className='noti-description'>{trimDescription(description)}</p>
        <div className='button-container'>
          <Button size="sm" variant="secondary" onClick={handleShow}>See more &nbsp; <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title className='noti-title'>{courseID} - {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='noti-description'>{description}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default NotificationCard;
