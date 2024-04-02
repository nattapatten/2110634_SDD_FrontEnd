
import React from 'react';
import './Login.css';
import chulaLogo from '../assets/chula_logo_Login.png';

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-logo">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" />
      </div>
      <div className="login-container">
        <h2 style={{ color: '#7949FF' }}>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email" >Email</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />
          </div>
          <div className="form-links">
            <a href="/register">Don't have an account? create a new account</a>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="btn-primary1">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
