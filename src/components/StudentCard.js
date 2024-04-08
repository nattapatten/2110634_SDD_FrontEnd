import React from 'react';
import './StudentCard.css'; // Import CSS file for styling
import StatusBar from './StatusBar';

const StudentCard = ({ title, name, image, status, gpa }) => {
  let cardClassName = "student-card";

  // Check the title and add additional class names accordingly
  if (title === "In Progress") {
    cardClassName += " container-purple2";
  } else if (title === "Graduated") {
    cardClassName += " container-purple3";
  } else if (title === "Resigned") {
    cardClassName += " container-purple2 gray-scale";
  }

  // Determine which component or text to render based on the title
  let statusComponent;
  if (title === "In Progress") {
    statusComponent = <StatusBar percentage={status} />;
  } else if (title === "Graduated") {
    statusComponent = <p style={{fontSize: '14px', margin: '0'}}> GPA: {gpa}</p>;
  }

  return (
    <div className={cardClassName}>
      <p className="card-title">{title}</p>
      <img src={image} alt={title} className="card-image" /> 
      <p className="student-name">{name}</p>
      {statusComponent}
    </div>
  );
};

export default StudentCard;
