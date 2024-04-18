import React from 'react';
import './StatusBar.css'; // Import CSS file for styling

const StatusBar = ({ percentage }) => {
  // Determine the background color based on the percentage
  const fillColor = percentage >= 100 ? '#4CAF50' : '#413A4E'; // #4CAF50 is green

  return (
    <div className="status-bar-container">
      <div
        className="status-bar-fill"
        style={{ width: `${percentage}%`, backgroundColor: fillColor }} // Apply the dynamic background color
      ></div>
    </div>
  );
};

export default StatusBar;
