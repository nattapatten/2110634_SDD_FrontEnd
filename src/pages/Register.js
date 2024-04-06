import React, { useState } from 'react';
import './Register.css';
import chulaLogo from '../assets/chula_logo_Login.png';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Outlet, Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    studentID: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const payLoad = {
          "studentID": formData.studentID,
          "name": formData.name,
          "email": formData.email,
          "password": formData.password,
          "phone": formData.phone,
          "role": "user"
        }
        const res = await axios.post('http://127.0.0.1:4000/api/v1/auth/register', payLoad); 
        console.log("ddddd");
        console.log(formData);
        alert('Registration Successful');
        
        // Redirect to LoginOTP page after successful registration
        navigate('/LoginOTP');
        
      } catch (error) {
        console.error('Registration Failed:', error);
        alert('Registration Failed');
      }
    }
    console.log(e);
  };

  return (
    <div className="register-wrapper">
      <div className="register-logo">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" />
      </div>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" id="studentID" placeholder="Enter Student ID" value={formData.studentID} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" id="name" placeholder="Enter Name" value={formData.name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="email" id="email" placeholder="Enter Email" value={formData.email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="tel" id="phone" placeholder="Enter Tel Number" value={formData.phone} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="password" id="password" placeholder="Enter Password" value={formData.password} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="password" id="confirmPassword" placeholder="Enter Re-confirm Password" value={formData.confirmPassword} onChange={onChange} required />
          </div>
          <button type="submit" className="btn-submit">Submit</button>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
