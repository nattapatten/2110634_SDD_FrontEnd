import React, { useState } from 'react';
import './SelectPath.css';
import chulaLogo from '../assets/chula_logo_Login.png'; 
import softwareEngineer from '../assets/softwareEngineer.png';
import systemAnalyst from '../assets/systemAnalyst.png';
import softwareDeveloper from '../assets/softwareDeveloper.png';
import softwareTester from '../assets/softwareTester.png';
import softwareMaintainer from '../assets/softwareMaintainer.png';
import projectManager from '../assets/projectManager.png';
import softwareTeacher from '../assets/softwareTeacher.png';
import softwareResearcher from '../assets/softwareResearcher.png';
import Modal from './Modal';
 
const paths = [
  { name: 'Software Engineer', icon: softwareEngineer, detail: 'More detail' },
  { name: 'System Analyst', icon: systemAnalyst, detail: 'More detail' },
  { name: 'Software Developer', icon: softwareDeveloper, detail: 'More detail' },
  { name: 'Software Tester', icon: softwareTester, detail: 'More detail' },
  { name: 'Software Maintainer', icon: softwareMaintainer, detail: 'More detail' },
  { name: 'Project Manager', icon: projectManager, detail: 'More detail' },
  { name: 'Software Teacher', icon: softwareTeacher, detail: 'More detail' },
  { name: 'Software Researcher', icon: softwareResearcher, detail: 'More detail' },
  
];

function SelectPath() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState({});

  // Function to handle opening the modal
  const handleOpenModal = (path) => {
    setSelectedPath(path);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="select-path-wrapper">
      <div className="select-path-header">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" />
      </div>
      <div className="cards-container">
        <h1 className="select-path-title" style={{ color: '#7949FF' }}>Study Path</h1>
        <div className="card-grid">
          {paths.map((path, index) => (
            <div className="card" key={index}>
              <img src={path.icon} alt={`${path.name} Icon`} />
              <div className="card-title">{path.name}</div>
              {/* Changed to a button for better accessibility, as per the second function */}
              <button className="card-link" onClick={() => handleOpenModal(path)}>
                {path.detail}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal component with props. Ensure that your Modal component can handle these props */}
      <Modal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={selectedPath.name}
        content="A magical tech wizard who conjures up software from the abyss of their mind. They apply mystical principles to make computers do things without blowing up – most of the time." // Consider dynamically changing this content based on the selected path
      />
    </div>
  );
}

export default SelectPath;