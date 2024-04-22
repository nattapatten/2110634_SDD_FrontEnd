import React from 'react';
import './MissionCard.css'; // Import CSS file for styling
import StatusBar from './StatusBar';

const MissionCard = ({ title, courseID, name, image, status, gpa }) => {
  let cardClassName = "student-card";

  if (title === "Enroll" && status < 100) {
    cardClassName += " container-purple2";
  } else if (title === "Pass" && status === 100) {
    cardClassName += " container-purple3";
  } else if (title === "Not Enroll" || title === "Withdraw") {
    cardClassName += " container-purple2 gray-scale";
  }

  const statusComponents = []; // Initialize an array to hold potential components

  if ((title === "Enroll" || title === "Pass") && status <= 100) {
    // Add the StatusBar component if the condition is met
    statusComponents.push(<StatusBar percentage={status} key="statusBar" />);
  }

  if (gpa !== null && gpa !== "") {
    // Add the paragraph with GPA if the condition is met
    statusComponents.push(<p style={{ fontSize: '14px', margin: '0' }} key="grade">Grade: {gpa}</p>);
  }
  else {
    statusComponents.push(<div className='status-bar-spacing'></div>)
  }



  return (
    <div className={cardClassName}>
      <p className="card-title">{title}</p>
      <img src={image} alt={title} className="card-image" />
      <p className="student-name">{courseID}</p>
      <p className="student-name">{name}</p>
      {statusComponents}
    </div>
  );
};

export default MissionCard;




// Check the title and add additional class names accordingly
// if (title === "Studying") {
//   cardClassName += " container-purple2";
// } else if (title === "Passed") {
//   cardClassName += " container-purple3";
// } else if (title === "Withdraw") {
//   cardClassName += " container-purple2 gray-scale";
// }

// // Determine which component or text to render based on the title
// let statusComponent;
// if (title === "Studying") {
//   statusComponent = <StatusBar percentage={status} />;
// } else if (title === "Passed") {
//   statusComponent = <p style={{fontSize: '14px', margin: '0'}}> Grade: {gpa}</p>;
// }




// else if (title === "Withdraw") {
//   cardClassName += " container-purple2 gray-scale";
// }

// Determine which component or text to render based on the title
// let statusComponent;
// if (title === "Enroll" && status <= 100) {
//   statusComponent = <StatusBar percentage={status} />;
// }

// if (gpa !== null && gpa !== "") {
//   statusComponent = <p style={{ fontSize: '14px', margin: '0' }}> Grade: {gpa}</p>;
// }