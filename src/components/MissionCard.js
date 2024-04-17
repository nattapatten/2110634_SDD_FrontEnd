import React from 'react';
import './MissionCard.css'; // Import CSS file for styling
import StatusBar from './StatusBar';

const MissionCard = ({ title, name, image, status, gpa }) => {
  let cardClassName = "student-card";

  // Check the title and add additional class names accordingly
  if (title === "Studying") {
    cardClassName += " container-purple2";
  } else if (title === "Passed") {
    cardClassName += " container-purple3";
  } else if (title === "Withdraw") {
    cardClassName += " container-purple2 gray-scale";
  }

  // Determine which component or text to render based on the title
  let statusComponent;
  if (title === "Studying") {
    statusComponent = <StatusBar percentage={status} />;
  } else if (title === "Passed") {
    statusComponent = <p style={{fontSize: '14px', margin: '0'}}> Grade: {gpa}</p>;
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

export default MissionCard;
