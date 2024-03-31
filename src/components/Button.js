import React from 'react';
import './Button.css'; // Importing the CSS file

const CustomButton = ({ variant, children, onClick }) => {
  return (
    <button className={`custom-button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
