import React, { useState } from 'react';
import './QuestCard.css'; // Import CSS file for styling
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const QuestCard = ({ title, description, image, time, courseID, dueDate }) => {
  const [show, setShow] = useState(false);

  // Function to handle opening the modal
  const handleShow = () => setShow(true);

  // Function to handle closing the modal
  const handleClose = () => setShow(false);

  // Function to trim the description to 100 characters for the main view
  const trimDescription = (text) => {
    // console.log('trim')
    // console.log(text)
    // console.log(typeof text)
    // console.log('----')
    // console.log(text.length)
    // console.log(text.slice(0, 100))
    // return text.length > 100 ? text.substring(0, 100) + "..." : text;
    // return text.length > 100 ? text.slice(0, 100) + "..." : text;
  };

  // Function to calculate the remaining days until the due date
  // const calculateDueDate = (dueDateString) => {
  //   const dueDate = new Date(dueDateString);
  //   const currentDate = new Date();
  //   const difference = dueDate - currentDate;
  //   const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));

  //   if (daysDifference < 0) {
  //     return "Past due";
  //   } else if (daysDifference === 0) {
  //     return "Due today";
  //   } else {
  //     return `Due in ${daysDifference} days`;
  //   }
  // };

  // Calculate the due date display string
  // const dueDateDisplay = calculateDueDate(dueDate);

  return (
    <div className='container-grey2 quest-container'>
      <div className='quest-top-section'>
        <div className='quest-image-container'>
          <img className='quest-image' src={image} alt="Quest" />
        </div>
        <div className='quest-content'>
          <p className='quest-title'>{courseID} - {title}</p>
          <p className='quest-description'>{trimDescription(description)}</p>
          {/* <p className='quest-description'>{description}</p> */}
        </div>
        {/* <div className='quest-posted-time'>
          <p>{time}</p>
        </div> */}
      </div>
      <div className='quest-bottom-section'>
        <div className='due-date-container'>
          {/* <p className='due-date'><FontAwesomeIcon className='clock-icon' icon={faClock} />{dueDate} ({dueDateDisplay})</p> */}
        </div>
        <div className='button-container'>
          <Button size="sm" variant="primary" className='see-more-button' onClick={handleShow}>See more</Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='quest-title'>{courseID} - {title}</Modal.Title>
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
