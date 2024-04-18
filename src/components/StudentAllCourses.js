import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentAllCourses.css';
import CourseCardStudent from './CourseCardStudent';
import books from '../assets/books.png';

const StudentAllCourses = ({ studentID }) => {
    console.log('studentID',studentID);
    const [courseData, setCourseData] = useState([]);
    const baseURL = 'http://127.0.0.1:4000'; // Make sure your baseURL is correct

    useEffect(() => {
        if (!studentID) return; // Ensure there is a studentID before fetching
        fetchCourseData(studentID);
    }, [studentID]);

    const fetchCourseData = async (studentID) => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/courses/getCourseByStudentID/${studentID}`);
            if (response.data.success) {
                setCourseData(response.data.data);
            } else {
                console.error('No course data found');
            }
        } catch (error) {
            console.error('Failed to fetch course data:', error);
        }
    };

    return (
        <>
            {courseData.map((course, index) => (
                <CourseCardStudent
                    key={index}
                    courseNumber={course.courseNumber}
                    courseName={course.courseName}
                    status={course.status.toString()} // Assuming status is returned as a number
                    image={ books} // Use provided image or fallback to default
                    gpa={course.courseGpa}
                />
            ))}
        </>
    );
};

export default StudentAllCourses;
