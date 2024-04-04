import React from 'react';
import './RegisterOTP.css';
import chulaLogo from '../assets/chula_logo_Login.png'; 
import OTP from '../assets/OTP.png'; // Make sure the path and file name are correct

function RegisterOTP() {
  return (
    <div className="otp-wrapper">
      <div className="otp-logo">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" className="chula-logo" />
      </div>
      <div className="otp-container">
      <img src={OTP} alt="OTP Icon" className="otp-icon" /> 
        <h2>Please check your email</h2>
        <p>We’ve sent a code to 6Xxxxxxxx@student.chula.ac.th</p>
        <form>
          <div className="otp-form-group">
            {[...Array(4)].map((_, index) => (
              <input key={index} type="text" maxLength="1" required />
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
