import './MissionInfoCard.css'; 
import React from 'react';
import MissionCard from './MissionCard';

const MissionInfoCard = ({ student, onClose }) => {
    if (!student) return null; // If no student data is provided, don't render the component

    return (
        <div className="student-info-container">
            <MissionCard 
                    title={student.title}
                    name={student.name}
                    status={student.status}
                    gpa={student.gpa}
                    image={student.image}
                />
            <div className='left'>  
                <div className='student-info'>
                    <p>Name: {student.name}</p>
                    <p>Path: {student.path}</p>
                    <p>Graduation Status: {student.status}%</p>
                    <p>Course Taken: 5/6</p>
                    <p>GPA: {student.gpa}</p>
                    <p>Last Updated: {student.lastUpdated}</p>
                    
                </div>
            </div>
            <div className='right'>

            </div>
            
        </div>
    );
};

export default MissionInfoCard;
