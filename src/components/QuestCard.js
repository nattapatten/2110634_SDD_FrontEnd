import React, { useState } from 'react';
import './QuestCard.css'; // Import CSS file for styling
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';


const QuestCard = ({ title, description, image, time, courseID, dueDate }) => {
  // console.log('description');
  // console.log(description);
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
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  // Function to calculate the formatted due date and days remaining
  const formatDateAndDueDate = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const currentDate = new Date();
    const difference = dueDate - currentDate;
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
    const formattedDueDate = format(dueDate, 'dd-MMM-yyyy'); // Formatting the date

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

  // Calculate the due date display string
  const dueDateDisplay = formatDateAndDueDate(dueDate);

  // Function to format date to "dd-MMM" format
  const formatPostedTime = (timeString) => {
    // Parse the ISO string and format it
    return format(parseISO(timeString), 'dd-MMM');
  };
  // Format the posted time
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

export default QuestCard;