import React, { useState } from 'react';
import { Button, Fade } from 'react-bootstrap';
import './DashboardAdvisor.css';
import AdvisorProfile from '../assets/AdvisorProfile.png';
import StudentCard from '../components/StudentCard';
import StudentProfile from '../assets/StudentProfile.png';
import books from '../assets/books.png';
import homework from '../assets/homework.png';
import CourseCard from '../components/CourseCard';
import NotificationCard from '../components/NotificationCard';
import QuestCard from '../components/QuestCard';
import StudentInfoCard from '../components/StudentInfoCard';

import StudentAllCourses from '../components/StudentAllCourses';

const DashboardAdvisor = () => {

    const courseData = [
        {
            courseNumber: "2110634",
            courseName: "Math for Software Engineering",
            maxStudents: "30",
            currentStudents: "17",
            image: books,
        },
        {
            courseNumber: "2110645",
            courseName: "Advanced Algorithms",
            maxStudents: "25",
            currentStudents: "20",
            image: books,
        },
        {
            courseNumber: "2110656",
            courseName: "System Architecture Design",
            maxStudents: "28",
            currentStudents: "28",
            image: books,
        },
        {
            courseNumber: "2110667",
            courseName: "Software Project Management",
            maxStudents: "30",
            currentStudents: "25",
            image: books,
        },
        {
            courseNumber: "2110678",
            courseName: "Database Systems",
            maxStudents: "30",
            currentStudents: "22",
            image: books,
        },
        {
            courseNumber: "2110689",
            courseName: "Machine Learning for Developers",
            maxStudents: "27",
            currentStudents: "27",
            image: books,
        },
        {
            courseNumber: "2110690",
            courseName: "Cloud Computing",
            maxStudents: "30",
            currentStudents: "18",
            image: books,
        },
        {
            courseNumber: "2110701",
            courseName: "Cybersecurity Fundamentals",
            maxStudents: "25",
            currentStudents: "20",
            image: books,
        },
        
    ];

    const studentData = [
        {
            title: "Graduated",
            image: StudentProfile,
            path: "Software Engineer",
            name: "James James",
            studentID: "11111111",
            status: "100",
            gpa: "3.80",
            lastUpdated: "2023-12-15T08:30:00",
        },
        {
            title: "Graduated",
            image: StudentProfile,
            path: "Project Managerr",
            name: "Jane Jane",
            studentID: "22222222",
            status: "100",
            gpa: "4.00",
            lastUpdated: "2023-11-30T14:45:00",
        },
        {
            title: "In Progress",
            image: StudentProfile,
            path: "Software Engineer",
            name: "John John",
            studentID: "33333333",
            status: "70",
            gpa: "2.80",
            lastUpdated: "2024-01-10T10:20:00",
        },
        {
            title: "In Progress",
            image: StudentProfile,
            path: "Software Engineer",
            name: "Alice Smith",
            studentID: "44444444",
            status: "80",
            gpa: "3.20",
            lastUpdated: "2024-02-05T11:15:00",
        },
        {
            title: "Graduated",
            image: StudentProfile,
            path: "DevOps Engineer",
            name: "Michael Johnson",
            studentID: "55555555",
            status: "100",
            gpa: "3.75",
            lastUpdated: "2023-10-20T09:00:00",
        },
        {
            title: "In Progress",
            image: StudentProfile,
            path: "Software Engineer",
            name: "Emily Williams",
            studentID: "66666666",
            status: "60",
            gpa: "3.00",
            lastUpdated: "2024-03-15T13:30:00",
        },
        {
            title: "Resigned",
            image: StudentProfile,
            path: "Software Engineer",
            name: "Matthew Brown",
            studentID: "77777777",
            status: "50",
            gpa: "2.50",
            lastUpdated: "2023-12-01T16:00:00",
        },
        {
            title: "In Progress",
            image: StudentProfile,
            path: "Software Engineer",
            name: "Emma Davis",
            studentID: "88888888",
            status: "40",
            gpa: "2.90",
            lastUpdated: "2024-04-05T09:45:00",
        },
        {
            title: "In Progress",
            image: StudentProfile,
            path: "Software Engineer",
            name: "Daniel Wilson",
            studentID: "12345678",
            status: "30",
            gpa: "2.80",
            lastUpdated: "2024-02-25T14:00:00",
        },
        {
            title: "Resigned",
            image: StudentProfile,
            path: "Software Engineer",
            name: "Olivia Miller",
            studentID: "12345678",
            status: "20",
            gpa: "2.70",
            lastUpdated: "2023-11-15T10:30:00",
        },
        // Add more student data objects with lastUpdated field including time
    ];

    const notificationData = [
        {
            title: "New Student Registration",
            description: "A new student, Emily Johnson, has successfully completed her registration process for the upcoming academic year under your advisement. Emily is pursuing a degree in Computer Science with a focus on artificial intelligence. It is essential to review her academic file, previous coursework, and plan an initial meeting to discuss her academic goals, course selections, and any specific needs or accommodations she may require."
        },
        {
            title: "Grade Alert: Low Performance",
            description: "Student John Smith's performance in the Calculus II course has recently dropped below the academic satisfactory threshold, with his latest test scores indicating a potential risk of failing. This situation calls for a proactive approach to understand the challenges John is facing and to develop an intervention plan. Suggestions include arranging tutoring sessions, discussing study habits, and possibly considering course withdrawal before the deadline to avoid an adverse impact on his GPA."
        },
        {
            title: "Scholarship Application Deadline",
            description: "The deadline for the upcoming academic scholarship applications is quickly approaching on April 30th. There are several scholarships available that target students excelling in academic performance, demonstrating community service, or in need of financial aid. Please make an effort to remind your eligible students to prepare their applications, ensuring they include all required documents and personal statements. Holding a brief workshop on how to write a compelling application could significantly benefit our students."
        },
        {
            title: "Updated Course Catalog",
            description: "The course catalog for the next academic year has been thoroughly updated, including several new courses that reflect the latest trends and technologies in the field of computer science, such as Advanced Machine Learning, Cybersecurity Ethics, and Blockchain Fundamentals. Please take the time to review these updates and discuss with your advisees how these new courses could fit into their academic and career plans, particularly those students who are nearing the completion of their degree requirements."
        },
        {
            title: "Internship Opportunities",
            description: "Our department has recently partnered with several leading tech companies to offer new internship opportunities in software development, data analysis, and cybersecurity. These internships not only provide valuable hands-on experience but also offer potential pathways to full-time positions upon graduation. Encourage students, especially those in their junior and senior years, to apply by May 15th. Assistance with resume writing and interview preparation is available through our career services office."
        },
        {
            title: "Student Withdrawal Notice",
            description: "Student Alice Williams has formally notified the administration of her decision to withdraw from the semester due to personal health reasons. Alice was making satisfactory progress in her studies, and her decision was not made lightly. Please update your records to reflect this change and reach out to Alice to offer support and discuss plans for her return to her studies, ensuring she is aware of the resources available to her during this time."
        },
        {
            title: "Advisory Meeting Schedule",
            description: "The next advisory board meeting is scheduled for June 5th at 10:00 AM in the main conference hall. The meeting's agenda includes critical discussions on curriculum updates, strategies for increasing student engagement and retention, and the integration of new educational technologies into our teaching methodologies. Your participation and insights into these topics are highly valued, and you are encouraged to submit any additional items for discussion ahead of the meeting."
        },
        {
            title: "Final Exam Schedules Posted",
            description: "The final exam schedules for this semester have now been posted on the university portal. These exams are a crucial component of the academic assessment process, and it is vital that all students are aware of their exam times, locations, and the materials permitted in the exam room. Please ensure your advisees review their schedules promptly and begin their preparations early to avoid any last-minute stress. Consider hosting review sessions for courses with historically high rates of difficulty."
        },
        {
            title: "Student Achievement",
            description: "We are thrilled to announce that your advisee, Mark Lee, has won the prestigious National Coding Competition, showcasing his exceptional skills in algorithm design and problem-solving. This remarkable achievement not only highlights Mark's talent and hard work but also brings honor and recognition to our department. We encourage you to acknowledge Mark's achievement, perhaps by featuring him in the department's newsletter or organizing a small celebration within the department to inspire his peers."
        },
        {
            title: "Summer Course Enrollment",
            description: "Enrollment for summer courses will begin next week, offering students the opportunity to advance their studies, explore new interests, or catch up on credits needed for graduation. The summer session provides a range of courses, including some that are typically highly subscribed during the regular semesters. Discuss with your students whether taking summer courses aligns with their academic plans, particularly those who may benefit from the smaller class sizes and more intensive study environment."
        }
    ];
    
    //All quests this advisor created
    const questData = [
        {
            title: "New Student Registration",
            description: "A new student, Emily Johnson, has successfully completed her registration process for the upcoming academic year under your advisement. Emily is pursuing a degree in Computer Science with a focus on artificial intelligence. It is essential to review her academic file, previous coursework, and plan an initial meeting to discuss her academic goals, course selections, and any specific needs or accommodations she may require.",
            image: homework,
        },
        {
            title: "Grade Alert: Low Performance",
            description: "Student John Smith's performance in the Calculus II course has recently dropped below the academic satisfactory threshold, with his latest test scores indicating a potential risk of failing. This situation calls for a proactive approach to understand the challenges John is facing and to develop an intervention plan. Suggestions include arranging tutoring sessions, discussing study habits, and possibly considering course withdrawal before the deadline to avoid an adverse impact on his GPA.",
            image: homework,
        },
        {
            title: "Scholarship Application Deadline",
            description: "The deadline for the upcoming academic scholarship applications is quickly approaching on April 30th. There are several scholarships available that target students excelling in academic performance, demonstrating community service, or in need of financial aid. Please make an effort to remind your eligible students to prepare their applications, ensuring they include all required documents and personal statements. Holding a brief workshop on how to write a compelling application could significantly benefit our students.",
            image: homework,
        },
        {
            title: "Updated Course Catalog",
            description: "The course catalog for the next academic year has been thoroughly updated, including several new courses that reflect the latest trends and technologies in the field of computer science, such as Advanced Machine Learning, Cybersecurity Ethics, and Blockchain Fundamentals. Please take the time to review these updates and discuss with your advisees how these new courses could fit into their academic and career plans, particularly those students who are nearing the completion of their degree requirements.",
            image: homework,
        },
        {
            title: "Internship Opportunities",
            description: "Our department has recently partnered with several leading tech companies to offer new internship opportunities in software development, data analysis, and cybersecurity. These internships not only provide valuable hands-on experience but also offer potential pathways to full-time positions upon graduation. Encourage students, especially those in their junior and senior years, to apply by May 15th. Assistance with resume writing and interview preparation is available through our career services office.",
            image: homework,
        },
    ];

    studentData.sort((a, b) => {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    });

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showStudentInfo, setShowStudentInfo] = useState(false);
    const [showNotificationsAndQuests, setShowNotificationsAndQuests] = useState(true);

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setShowStudentInfo(true);
        setShowNotificationsAndQuests(false); // Hide Notifications and Quests
    };

    const handleClose = () => {
        setShowStudentInfo(false);
        setSelectedStudent(null);
        setShowNotificationsAndQuests(true); // Show Notifications and Quests
    };

    return (
        <div className='advisor-container'>
            <section className='section1'>
                <div className="container-grey advisor-box">
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Advisor</p>
                    <div className='advisorProfile'>
                        <img src={AdvisorProfile} alt="Advisor" />
                    </div>
                    <p style={{fontSize: '18px'}}>John Smith</p>
                </div>
                <div className='container-grey students-container'>
                    <div className='top-of-student-container'>
                        <p className='student-container-title' style={{fontSize: '20px', fontWeight: 'bold'}}>Your Students</p>
                        {showStudentInfo && <Button className='close-button' onClick={handleClose}>x</Button>}
                    </div>
                    {showStudentInfo ? (
                        <StudentInfoCard student={selectedStudent} onClose={handleClose} />
                    ) : (
                        <div className='student-list'>
                            {studentData.map((student, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleStudentClick(student)}
                                    className='student-card-wrapper'
                                    tabIndex="0"
                                >
                                    <StudentCard
                                        title={student.title}
                                        image={student.image}
                                        name={student.name}
                                        status={student.status}
                                        gpa={student.gpa}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
                {showStudentInfo && (
                    <div className='container-grey'>
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Student's Courses</p>
                            <div className='all-courses-container'>
                                <StudentAllCourses studentID={selectedStudent.studentID} onClose={handleClose} />
                            </div>
                    </div>
                        )}
                    

            <Fade in={showNotificationsAndQuests}>
            <section className={showNotificationsAndQuests ? "visible" : "hidden"}>
                <div className="section2 container-grey">
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Your Courses</p>
                    <div className='course-list'>
                        {courseData.map((course, index) => (
                            <CourseCard 
                                key={index}
                                courseNumber={course.courseNumber}
                                courseName={course.courseName}
                                maxStudents={course.maxStudents}
                                currentStudents={course.currentStudents}
                                image={course.image}
                            />
                        ))}
                    </div>
                </div>
                <br/>
                    <div className="section3 ">
                        <div className='advisor-notification container-grey'>
                            <p style={{fontSize: '20px', fontWeight: 'bold'}}>Notifications</p>
                            <div className='notification-list'>
                                {notificationData.map((notification, index) => (
                                    <NotificationCard
                                        key={index}
                                        title={notification.title}
                                        description={notification.description}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='advisor-quest container-grey'>
                            <p style={{fontSize: '20px', fontWeight: 'bold'}}>Quests</p>
                            <div className='notification-list'>
                                {questData.map((quest, index) => (
                                    <QuestCard
                                        key={index}
                                        title={quest.title}
                                        description={quest.description}
                                        image={quest.image}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>
        </div>
    );
};

export default DashboardAdvisor;