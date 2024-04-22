import './MissionInfoCard.css'; 
import React from 'react';
import MissionCard from './MissionCard';
import homework from "../assets/homework.png";


const EnrollStatusEnum = {
    "0": "Not Enroll",
    "1": "Enroll",
    "2": "Withdraw"
  };


const MissionInfoCard = ({ student, onClose }) => {
    if (!student) return null; // If no student data is provided, don't render the component

    console.log("student:", student)

    return (
        <div className="student-info-container">
            <MissionCard 
                    title={student.title} // Display text representation of enrollment status
                    name={student.name}
                    status={student.status}
                    gpa={student.gpa}
                    image={homework}
                />
            <div className='left'>  
                <div className='student-info'>
                    <p>Name: {student.name}</p>
                    <p>Path: {student.path}</p>
                    <p>Progress Status: {student.status}%</p>
                    <p>Course Taken: 5/6</p>
                    <p>Grade: {student.gpa}</p>
                    <p>Last Updated: {student.lastUpdated}</p>
                    
                </div>
            </div>
            <div className='right'>

            </div>
            
        </div>
    );
};

// const MissionInfoCard = ({ student, onClose }) => {
//     if (!student) return null; // If no student data is provided, don't render the component

//     return (
//         <div className="student-info-container">
//             <MissionCard 
//                 title={student.title}
//                 name={student.name}
//                 status={student.status}
//                 gpa={student.gpa}
//                 image={homework}
//             />
//             <div className='left'>  
//                 <div className='student-info'>
//                     <p>Name: {student.name}</p>
//                     <p>Path: {student.path}</p>
//                     <p>Graduation Status: {student.status}%</p>
//                     <p>Course Taken: {student.courses.length}/6</p>
//                     <p>Grade: {student.gpa}</p>
//                     <p>Last Updated: {student.lastUpdated}</p>
//                     {student.courses.map((course, index) => (
//                         <div key={index}>
//                             <p>Course ID: {course.courseID}</p>
//                             <p>Grade Percentage: {course.gradePercentage}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='right'>
//                 {/* Additional details or actions can be added here */}
//             </div>
//         </div>
//     );
// };

export default MissionInfoCard;
