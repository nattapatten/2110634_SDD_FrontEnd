import React, { useState } from "react";
import "./SelectPath.css";
import chulaLogo from "../assets/chula_logo_Login.png";
import softwareEngineer from "../assets/softwareEngineer.png";
import systemAnalyst from "../assets/systemAnalyst.png";
import softwareDeveloper from "../assets/softwareDeveloper.png";
import softwareTester from "../assets/softwareTester.png";
import softwareMaintainer from "../assets/softwareMaintainer.png";
import projectManager from "../assets/projectManager.png";
import softwareTeacher from "../assets/softwareTeacher.png";
import softwareResearcher from "../assets/softwareResearcher.png";
import Modal from "./Modal";
import Modal1 from "./Modal1";

const paths = [
  {
    name: "Software Engineer",
    icon: softwareEngineer,
    detail: "More detail",
    description:
      "A magical tech wizard who conjures up software from the abyss of their mind. They apply mystical principles to make computers do things without blowing up – most of the time.",
  },
  {
    name: "System Analyst",
    icon: systemAnalyst,
    detail: "More detail",
    description: `The Sherlock Holmes of the tech world. Their job is to snoop around, ask What's up? to computers and systems, and then scribble down cryptic notes that somehow make everything work better. `,
  },
  {
    name: "Software Developer",
    icon: softwareDeveloper,
    detail: "More detail",
    description:
      "The creative chefs in a vast digital kitchen, cooking up apps and programs. They mix a pinch of code with a dash of creativity to serve up software that sometimes surprises even themselves.",
  },
  {
    name: "Software Tester",
    icon: softwareTester,
    detail: "More detail",
    description: `The professional nitpickers of the software world. Their motto: "If it ain't broke, I haven't tested it yet." They find joy in breaking stuff just to tell developers, "Told you so!" `,
  },
  {
    name: "Software Maintainer",
    icon: softwareMaintainer,
    detail: "More detail",
    description: `The digital world's handymen and handywomen. They patch up software, oil the gears, and sometimes kick the server to keep things running smoothly. It's like duct tape for code.`,
  },
  {
    name: "Project Manager",
    icon: projectManager,
    detail: "More detail",
    description: `The circus ringmasters of the software development world. They juggle tasks, timelines, and resources, all while riding the unicycle of client expectations. Somehow, they manage to keep the show going without (visible) sweat.`,
  },
  {
    name: "Software Teacher",
    icon: softwareTeacher,
    detail: "More detail",
    description: `The wise old wizards who pass down ancient programming scrolls (now PDFs) to young apprentices. Their magic spells (code snippets) can sometimes make computers do homework for you.`,
  },
  {
    name: "Software Researcher",
    icon: softwareResearcher,
    detail: "More detail",
    description: `The Indiana Joneses of the tech realm, always on a quest for the Holy Grail of Algorithms. They dive into digital jungles and emerge with relics of knowledge that could either change the world or crash your computer.`,
  },
];

function SelectPath() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleOpenModal = (path) => {
    setSelectedPath(path);
    setIsModalOpen(true);
  };

  const handleApply = () => {
    setShowConfirmationModal(true);
  };

  const handlePathConfirmation = () => {
    console.log(`Confirmed path: ${selectedPath.name}`);
    setIsModalOpen(false);
    setShowConfirmationModal(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowConfirmationModal(false);
  };

  return (
    <div className="select-path-wrapper">
      <div className="select-path-header">
        <img src={chulaLogo} alt="Chulalongkorn University Logo" />
      </div>
      <div className="cards-container">
        <h1 className="select-path-title" style={{ color: "#7949FF" }}>
          Study Path
        </h1>
        <div className="card-grid">
          {paths.map((path, index) => (
            <div className="card" key={index}>
              <img src={path.icon} alt={`${path.name} Icon`} />
              <div className="card-title1">{path.name}</div>
              <button
                className="card-link"
                onClick={() => handleOpenModal(path)}>
                {path.detail}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Modal
        image={selectedPath.icon}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleConfirm={handlePathConfirmation}
        handleApply={handleApply}
        title={selectedPath.name}
        content={selectedPath.description}
        showConfirmation={showConfirmationModal}
      />
      <Modal1
        isOpen={isModalOpen && showConfirmationModal}
        handleClose={handleCloseModal}
        handleConfirm={handlePathConfirmation}
        title={selectedPath.name}
        content={`Are you sure you want to apply for the ${selectedPath.name} path?`}
        showConfirmation={showConfirmationModal}
      />
    </div>
  );
}

export default SelectPath;
