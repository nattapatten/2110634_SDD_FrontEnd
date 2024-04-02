import React from 'react';
import './Register.css';
import chulaLogo from '../assets/chula_logo_Login.png'; 

function Register() {
  return (
    <div className="register-wrapper">
      <div className="register-logo">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" />
      </div>
      <div className="register-container">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <input type="text" id="student-id" placeholder="Enter Student ID" required />
          </div>
          <div className="form-group">
            <input type="text" id="name" placeholder="Enter Name" required />
          </div>
          <div className="form-group">
            <input type="email" id="email" placeholder="Enter Email" required />
          </div>
          <div className="form-group">
            <input type="tel" id="tel-number" placeholder="Enter Tel Number" required />
          </div>
          <div className="form-group">
            <input type="password" id="password" placeholder="Enter Password" required />
          </div>
          <div className="form-group">
            <input type="password" id="re-confirm-password" placeholder="Enter Re-confirm Password" required />
          </div>
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
