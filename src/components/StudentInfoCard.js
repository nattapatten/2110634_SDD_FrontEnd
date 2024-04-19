import "./StudentInfoCard.css";
import React from "react";
import StudentCard from "./StudentCard";

const StudentInfoCard = ({ student, onClose }) => {
  if (!student) return null; // If no student data is provided, don't render the component

  return (
    <div className="student-info-container">
      <StudentCard
        title={student.title}
        name={student.name}
        status={student.status}
        gpa={student.gpa}
        image={student.image}
      />
      <div className="left">
        <div className="student-info">
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>
          <p>Phone number: {student.phone}</p>
          <p>Path: {student.pathName}</p>
          <p>Graduation Status: {student.status}%</p>

          {/* <p>Course Taken: 5/6</p> */}
          <p>GPA: {student.gpa}</p>
          {/* <p>Last Updated: {student.lastUpdated}</p> */}
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default StudentInfoCard;
