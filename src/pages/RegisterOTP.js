import React, { useState, useEffect } from 'react';
import './RegisterOTP.css';
import chulaLogo from '../assets/chula_logo_Login.png'; 
import OTP from '../assets/OTP.png'; // Make sure the path and file name are correct
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation

function RegisterOTP() {
  const location = useLocation(); // Initialize useLocation
  const [otp, setOtp] = useState(Array(4).fill('')); // Initialize otp as an array of 4 empty strings
  const [email, setEmail] = useState(''); // Initialize email state

  useEffect(() => {
    // Extract email from location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Concatenate the OTP digits into a single string
    const otpString = otp.join('');
    console.log(otpString);
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/v1/auth/verify-otp-registration', { email: email, otp: otpString });
      // Handle the response as needed
      console.log('Verification successful:', response.data);
    } catch (error) {
      console.error('Verification failed:', error);
      // Handle verification failure
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-logo">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" className="chula-logo" />
      </div>
      <div className="otp-container">
        <img src={OTP} alt="OTP Icon" className="otp-icon" /> 
        <h2>Please check your email</h2>
        <p>We’ve sent a code to {email}</p> {/* Display the email */}
        <form onSubmit={handleSubmit}>
          <div className="otp-form-group">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                value={otp[index]}
                onChange={(e) => {
                  const newOtp = [...otp];
                  newOtp[index] = e.target.value;
                  setOtp(newOtp);
                }}
              />
            ))}
          </div>
          <h5>Didn't get the code?</h5>
          <button type="button" className="otp-resend">Click to resend</button>
          <div className="otp-actions">
            <button type="button" className="otp-cancel2">Cancel</button>
            <button type="submit" className="btn-primary2">Verify</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterOTP;
