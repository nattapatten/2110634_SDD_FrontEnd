import React, { useState } from 'react';
import './QuestCard.css'; // Import CSS file for styling
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';


const QuestCard = ({ title, description, image }) => {
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
    <div className='container-grey2 quest-container'>
        <div className='quest-top-section'>
            <div className='quest-image-container'>
                <img className='quest-image' src={image} />
            </div>
            <div className='quest-content'>
                <p className='quest-title'>{title}</p>
                <p className='quest-description'>{trimDescription(description)}</p>
            </div>
            <div className='quest-posted-time'>
                <p>1:07 PM</p>
            </div>
        </div>
        <div className='quest-bottom-section'>
            <div className='due-date-container'>
               <p className='due-date'><FontAwesomeIcon className='clock-icon'  icon={faClock} />2 April 2024 (Due in 2 days)</p> 
            </div>
            <div className='button-container'>
                <Button size="sm" variant="primary"  className='see-more-button' onClick={handleShow}>See more</Button>
            </div> 
        </div>


        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title className='quest-title'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='quest-description'>{description}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default QuestCard;
