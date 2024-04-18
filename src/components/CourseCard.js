import React from 'react';
import './CourseCard.css'; // Import CSS file for styling
import StatusBar from './StatusBar';

const CourseCard = ({ courseName, courseNumber, maxStudents, currentStudents, image}) => {
  let cardClassName = "course-card";

//   // Check the title and add additional class names accordingly
  if (currentStudents === maxStudents) {
    cardClassName += " container-purple3";
  } else {
    cardClassName += " container-purple2";
  }

//   // Determine which component or text to render based on the title
    const status = currentStudents*100/maxStudents;


  return (
    <div className={cardClassName}>
      <p className="card-title">{courseNumber}</p>
      <div className='image-container'>
        <img src={image} className="card-image round-image" />
      </div>
      <p className="course-name">{courseName}</p>
      <div className='bottom-contents'>
        <StatusBar percentage={status} />
        <p className='student-number' >Student: {maxStudents}</p>
      </div>
    </div>
  );
};

export default CourseCard;
