import React from 'react';
import './StudentAllCourses.css'; // Import CSS file for styling
import books from '../assets/books.png';
import CourseCardStudent from './CourseCardStudent';

const StudentAllCourses = ({studentID}) => {

    const courseData = [
        {
            courseNumber: "1111111",
            courseName: "Course name1",
            status: "70",
            image: books,
            gpa: null
        },
        {
            courseNumber: "2222222",
            courseName: "Course name2",
            status: "100",
            image: books,
            gpa: "B+"
        },
        {
            courseNumber: "3333333",
            courseName: "Course name3",
            status: "100",
            image: books,
            gpa: "A"
        },
        {
            courseNumber: "4444444",
            courseName: "Course name4",
            status: "100",
            image: books,
            gpa: "A"
        },
        {
            courseNumber: "5555555",
            courseName: "Course name5",
            status: "80",
            image: books,
            gpa: null
        },
        {
            courseNumber: "2666666",
            courseName: "Course name6",
            status: "100",
            image: books,
            gpa: "A"
        },
        {
            courseNumber: "2110634",
            courseName: "Course name7",
            status: "100",
            image: books,
            gpa: "A"
        },
        {
            courseNumber: "2110634",
            courseName: "Course name8",
            status: "0",
            image: books,
            gpa: null
        },
        {
            courseNumber: "2110634",
            courseName: "Course name9",
            status: "20",
            image: books,
            gpa: null
        },
        {
            courseNumber: "2110634",
            courseName: "Course name12",
            status: "100",
            image: books,
            gpa: "B+"
        },
    ]

  return (
    <>
      {courseData.map((course, index) => (
            <CourseCardStudent 
                key={index}
                courseNumber={course.courseNumber}
                courseName={course.courseName}
                status={course.status}
                image={course.image}
                gpa={course.gpa}
            />
        ))}
    </>
  );
};

export default StudentAllCourses;
