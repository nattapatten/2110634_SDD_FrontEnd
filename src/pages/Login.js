import React, { useState } from 'react';
import './Login.css';
import chulaLogo from '../assets/chula_logo_Login.png';
import axios from 'axios'; // Import axios for making HTTP requests

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('your_backend_login_endpoint', { email, password });
      // Assuming your backend returns a token upon successful login
      const token = response.data.token;
      // You can store the token in local storage or cookies for further authentication
      // Example: localStorage.setItem('token', token);
      console.log('Login successful, token:', token);
      // Redirect the user or perform any other action upon successful login
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure, show error message to the user, etc.
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" />
      </div>
      <div className="login-container">
        <h2 style={{ color: '#7949FF' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-links">
            <a href="/register">Don't have an account? create a new account</a>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="btn-primary1">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
