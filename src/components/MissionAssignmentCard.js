import React from 'react';
import './MissionAssignmentCard.css';
import StatusBar from './StatusBar';

const MissionAssignmentCard = ({ courseName, courseNumber, gpa, status, image }) => {
  // Ensure status is treated as a number
  const numericStatus = Number(status);
  console.log('Status:', numericStatus, 'Type:', typeof numericStatus);

  let cardClassName = "course-card-student";
  if (numericStatus === 100) {
    // Add a space before the class name
    cardClassName += " container-purple3";
  } else {
    // Add a space before the class name
    cardClassName += " container-purple2";
  }

  return (
    <div className={cardClassName}>
      <p className="card-title">{courseNumber}</p>
      <div className='image-container'>
        <img src={image} alt="Course" className="card-image" />
      </div>
      <p className="course-name">{courseName}</p>
      <div className='bottom-contents'>
        {/* <StatusBar percentage={numericStatus} /> */}
        <StatusBar percentage={status} key="statusBar" />
        <p className='student-number'>Your Score: {gpa ? gpa : "N/A"}</p>
      </div>
    </div>
  );
};

export default MissionAssignmentCard;
