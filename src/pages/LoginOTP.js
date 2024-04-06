import React, { useState } from 'react';
import './LoginOTP.css';
import chulaLogo from '../assets/chula_logo_Login.png'; 
import OTP from '../assets/OTP.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate hooks

function LoginOTP() {
  const location = useLocation(); // Get location object
  const emailFromLogin = location.state?.email || ''; // Get email from location state or use an empty string if it's null

  const navigate = useNavigate(); // Initialize useNavigate

  const [email, setEmail] = useState(emailFromLogin); // Set email state with the one from Login component
  const [otp, setOtp] = useState(Array(4).fill('')); // Initialize otp as an array of 4 empty strings

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Concatenate the OTP digits into a single string
    const otpString = otp.join('');
    console.log(email, otpString);
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/v1/auth/verify-otp', { email, otp: otpString });
      // Assuming the token is received in the response
      const token = response.data.token;
      // Store the token securely, for example, in local storage
      localStorage.setItem('authToken', token);
      // Redirect to /SelectPath after successful verification
      console.log('Verification successful:', response.data);
      navigate('/');
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
        <p>We’ve sent a code to {email}</p>
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

export default LoginOTP;
