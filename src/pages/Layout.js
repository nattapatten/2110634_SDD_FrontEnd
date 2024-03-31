import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button to trigger the sidebar */}
      
      <nav class="navbar navbar-dark bg-dark">
      <Button variant="primary" className="btn-dark-custom" onClick={handleShow}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      </nav>
      

      {/* Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chula Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Navigation Links within the Sidebar */}
          <nav>
            <ul>
              <li>
                <Link to="/" onClick={handleClose}>DashboardStudent</Link>
              </li>
              <li>
                <Link to="/Login" onClick={handleClose}>Login</Link>
              </li>
              <li>
                <Link to="/LoginOTP" onClick={handleClose}>LoginOTP</Link>
              </li>
              <li>
                <Link to="/Register" onClick={handleClose}>Register</Link>
              </li>
              <li>
                <Link to="/RegisterOTP" onClick={handleClose}>RegisterOTP</Link>
              </li>
              <li>
                <Link to="/SelectPath" onClick={handleClose}>SelectPath</Link>
              </li>
              <li>
                <Link to="/AllComponents" onClick={handleClose}>AllComponents</Link>
              </li>
            </ul>
          </nav>
          
          {/* You can add more content here such as text, images, lists, etc. */}
        </Offcanvas.Body>
        <div className="logout-div">
          <button className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'white' }} />
          </button>
          <a className="logout-name">Logout</a> 
        </div>
      </Offcanvas>

      {/* Outlet for rendering the matched route components */}
      <Outlet />
    </>
  )
};

export default Layout;
