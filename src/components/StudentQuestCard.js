import React, { useState } from 'react';
import './StudentQuestCard.css'; // Import CSS file for styling
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

const StudentQuestCard = ({ title, description, image, time, courseID, dueDate }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const trimDescription = (text) => {
    return text && text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  const formatDateAndDueDate = (dueDateString) => {
    if (!dueDateString) return "No due date provided";  // Check if the due date string is null or undefined

    const dueDate = new Date(dueDateString);
    const currentDate = new Date();
    const difference = dueDate - currentDate;
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
    const formattedDueDate = format(dueDate, 'dd-MMM-yyyy');

    let dueDateStringFormatted;
    if (daysDifference < 0) {
      dueDateStringFormatted = `${formattedDueDate} (Past due)`;
    } else if (daysDifference === 0) {
      dueDateStringFormatted = `${formattedDueDate} (Due today)`;
    } else {
      dueDateStringFormatted = `${formattedDueDate} (Due in ${daysDifference} days)`;
    }
    return dueDateStringFormatted;
  };

  const formatPostedTime = (timeString) => {
    if (!timeString) return "No date provided";  // Check if the time string is null or undefined

    return format(parseISO(timeString), 'dd-MMM');
  };

  const dueDateDisplay = formatDateAndDueDate(dueDate);
  const formattedTime = formatPostedTime(time);

  return (
    <div className='container-grey2 quest-container'>
      <div className='quest-top-section'>
        <div className='quest-image-container'>
          <img className='quest-image' src={image} alt="Quest" />
        </div>
        <div className='quest-content'>
          <p className='quest-title'>{courseID} - {title}</p>
          <p className='quest-description'>{trimDescription(description)}</p>
        </div>
        <div className='quest-posted-time'>
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className='quest-bottom-section'>
        <div className='due-date-container'>
          <p className='due-date'><FontAwesomeIcon className='clock-icon' icon={faClock} />{dueDateDisplay}</p>
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

export default StudentQuestCard;
