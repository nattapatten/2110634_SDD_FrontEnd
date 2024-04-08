import React from 'react';
import './StatusBar.css'; // Import CSS file for styling

const StatusBar = ({ percentage }) => {
  return (
    <div className="status-bar-container">
      <div className="status-bar-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default StatusBar;
