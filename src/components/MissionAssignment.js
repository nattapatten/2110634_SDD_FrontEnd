import React from 'react';
import './MissionAssignment.css';
import MissionAssignmentCard from './MissionAssignmentCard';
import books from '../assets/books.png';

const MissionAssignment = ({ assignments }) => {


    const assignment_progress = 100;
    console.log("assignments:", assignments)
    return (
        <>
            {assignments.map((assignment, index) => (
                <MissionAssignmentCard
                    key={index}
                    courseNumber={assignment.CourseID} // Assuming you have courseID or similar
                    courseName={assignment.title} // Adjust according to your data structure
                    // status={assignment.status.toString()} // Adjust if necessary
                    status={assignments.GradePercentage}
                    image={books} // Use the provided image or a default
                    gpa={assignment.gpa} // Assuming you have GPA in your assignments
                />
            ))}
        </>
    );
};

export default MissionAssignment;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StudentAllCourses.css';
// import CourseCardStudent from './CourseCardStudent';
// import books from '../assets/books.png';

// const MissionAssignment = ({ studentID }) => {
//     console.log('studentID',studentID);
//     const [courseData, setCourseData] = useState([]);
//     const baseURL = 'http://127.0.0.1:4000'; // Make sure your baseURL is correct

//     useEffect(() => {
//         if (!studentID) return; // Ensure there is a studentID before fetching
//         fetchCourseData(studentID);
//     }, [studentID]);

//     const fetchCourseData = async (studentID) => {
//         try {
//             const response = await axios.get(`${baseURL}/api/v1/courses/getCourseByStudentID/${studentID}`);
//             if (response.data.success) {
//                 setCourseData(response.data.data);
//             } else {
//                 console.error('No course data found');
//             }
//         } catch (error) {
//             console.error('Failed to fetch course data:', error);
//         }
//     };

//     return (
//         <>
//             {courseData.map((course, index) => (
//                 <CourseCardStudent
//                     key={index}
//                     courseNumber={course.courseNumber}
//                     courseName={course.courseName}
//                     status={course.status.toString()} // Assuming status is returned as a number
//                     image={ books} // Use provided image or fallback to default
//                     gpa={course.courseGpa}
//                 />
//             ))}
//         </>
//     );
// };

// export default MissionAssignment;
