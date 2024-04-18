import React, { useState, useEffect } from 'react';
import { Button, Fade, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
import axios from 'axios';

const DashboardAdvisor = () => {
    const advisorID = "ADV002";
    
    const baseURL = 'http://127.0.0.1:4000';

    
    const courseData = [
        {
            courseID: "2110634",
            courseName: "Math for Software Engineering",
            maxStudents: "30",
            currentStudents: "17",
            image: books,
        },
        {
            courseID: "2110645",
            courseName: "Advanced Algorithms",
            maxStudents: "25",
            currentStudents: "20",
            image: books,
        },
        {
            courseID: "2110656",
            courseName: "System Architecture Design",
            maxStudents: "28",
            currentStudents: "28",
            image: books,
        },
        {
            courseID: "2110690",
            courseName: "Cloud Computing",
            maxStudents: "30",
            currentStudents: "18",
            image: books,
        },
        {
            courseID: "2110690",
            courseName: "Cloud Computing",
            maxStudents: "30",
            currentStudents: "18",
            image: books,
        },
        {
            courseID: "2110690",
            courseName: "Cloud Computing",
            maxStudents: "30",
            currentStudents: "18",
            image: books,
        },
        
        
    ];

    const questData = [
        {
            courseID: "2110634",
            title: "New Student Registration",
            description: "A new student, Emily Johnson, has successfully completed her registration process for the upcoming academic year under your advisement. Emily is pursuing a degree in Computer Science with a focus on artificial intelligence. It is essential to review her academic file, previous coursework, and plan an initial meeting to discuss her academic goals, course selections, and any specific needs or accommodations she may require.",
            image: homework,
            time: "1 Apr",
            dueDate: "5 May 2024"
        },
        {
            courseID: "2110645",
            title: "Grade Alert: Low Performance",
            description: "Student John Smith's performance in the Calculus II course has recently dropped below the academic satisfactory threshold, with his latest test scores indicating a potential risk of failing. This situation calls for a proactive approach to understand the challenges John is facing and to develop an intervention plan. Suggestions include arranging tutoring sessions, discussing study habits, and possibly considering course withdrawal before the deadline to avoid an adverse impact on his GPA.",
            image: homework,
            time: "1 Apr",
            dueDate: "20 April 2024"
        },
        {
            courseID: "2110656",
            title: "Scholarship Application Deadline",
            description: "The deadline for the upcoming academic scholarship applications is quickly approaching on April 30th. There are several scholarships available that target students excelling in academic performance, demonstrating community service, or in need of financial aid. Please make an effort to remind your eligible students to prepare their applications, ensuring they include all required documents and personal statements. Holding a brief workshop on how to write a compelling application could significantly benefit our students.",
            image: homework,
            time: "1 Apr",
            dueDate: "2 April 2024"
        },
        {
            courseID: "2110656",
            title: "Updated Course Catalog",
            description: "The course catalog for the next academic year has been thoroughly updated, including several new courses that reflect the latest trends and technologies in the field of computer science, such as Advanced Machine Learning, Cybersecurity Ethics, and Blockchain Fundamentals. Please take the time to review these updates and discuss with your advisees how these new courses could fit into their academic and career plans, particularly those students who are nearing the completion of their degree requirements.",
            image: homework,
            time: "1 Apr",
            dueDate: "5 October 2024"
        },
        {
            courseID: "2110690",
            title: "Internship Opportunities",
            description: "Our department has recently partnered with several leading tech companies to offer new internship opportunities in software development, data analysis, and cybersecurity. These internships not only provide valuable hands-on experience but also offer potential pathways to full-time positions upon graduation. Encourage students, especially those in their junior and senior years, to apply by May 15th. Assistance with resume writing and interview preparation is available through our career services office.",
            image: homework,
            time: "1 Apr",
            dueDate: "2 April 2024"
        },
    ];


    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showStudentInfo, setShowStudentInfo] = useState(false);
    const [showNotificationsAndQuests, setShowNotificationsAndQuests] = useState(true);
    const [showNotiModal, setShowNotiModal] = useState(false);
    const [showQuestModal, setShowQuestModal] = useState(false);

    // noti form state
    const [courseID, setCourseID] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    

    //State for query
    const [notifications, setNotifications] = useState([]);
    const [quests, setQuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotifications = async () => {
        setIsLoading(true);  // Start loading
        try {
            const response = await axios.get(`${baseURL}/api/v1/notifications`);
            // console.log('noti response', response)
            setNotifications(response.data.data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            // Optionally update state to indicate an error
        }
        setIsLoading(false);  // Stop loading
    };

    // Fetch notifications from an API when component mounts
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchQuests = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/assignments`);
            if (response.data && response.data.data) {
                setQuests(response.data.data); // Set the quests state to the nested data array
            } else {
                console.error('Quest data not found');
            }
        } catch (error) {
            console.error('Failed to fetch quests:', error);
        }
        setIsLoading(false);
    }    

    useEffect(() => {
        fetchQuests();
    }, []);
    
    

    //handle query loading error
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    //noti modal
    const handleCloseNotiModal = () => setShowNotiModal(false);
    const handleShowNotiModal = () => setShowNotiModal(true);

    //noti input onchange fn
    const handleCourseIDChange = (e) => setCourseID(e.target.value);
    const handleSummaryChange = (e) => setSummary(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);


    const handleSubmit = async () => {
        const payload = {
            courseID: courseID,
            title: summary,
            description: description
        };

        setIsSubmitting(true);
        setSubmitError('');

        try {
            // POST request to add a new notification
            const response = await axios.post(`${baseURL}/api/v1/notifications`, payload);
            console.log('Notification posted successfully:', response.data.data);

            // Update state to trigger re-render with new notifications
            // setNotifications(prevNotifications => [
            //     ...prevNotifications,
            //     response.data.data
            // ]);

            // Reset form state and close modal after submission
            setCourseID('');
            setSummary('');
            setDescription('');
            handleCloseNotiModal();
    
            fetchNotifications();
        } catch (error) {
            console.error('Failed to post notification:', error);
            setSubmitError('Failed to post notification. Please try again.');
        }
        setIsSubmitting(false);
    };
    
    

    // quest form state
    const [questCourseID, setQuestCourseID] = useState('');
    const [questTitle, setQuestTitle] = useState('');
    const [questDescription, setQuestDescription] = useState('');

    //quest modal
    const handleCloseQuestModal = () => setShowQuestModal(false);
    const handleShowQuestModal = () => setShowQuestModal(true);

    // Quest handler fn
    const handleQuestCourseIDChange = (e) => setQuestCourseID(e.target.value);
    const handleQuestTitleChange = (e) => setQuestTitle(e.target.value);
    const handleQuestDescriptionChange = (e) => setQuestDescription(e.target.value);

    //quest submit
    const handleQuestSubmit = () => {
        const currentTime = "2024-04-12 05:12:07"; // Replace this with dynamic time if needed
    
        const formData = {
            questCourseID,
            questTitle,
            questDescription,
            time: currentTime, // Add the current time here
        };
        // console.log('inside quest')
        // console.log(formData); // This will now include the current time
    
        handleCloseQuestModal(); // Close modal after submission
        // Optionally reset form fields here if needed
    };
    

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

    //Advisor info
    const [advisorInfo, setAdvisorInfo] = useState({});
    const fetchAdvisorData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/advisor/${advisorID}`);
            setAdvisorInfo(response.data.data);
            console.log('Advisor Data:', response.data.data);
        } catch (error) {
            console.error('Error fetching advisor data:', error);
        }
    };

    useEffect(() => {
        fetchAdvisorData();
    }, []);
    //Student data
    const [studentData, setStudentData] = useState([]);
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/student/${advisorID}`);
            if (response.data.success && response.data.data) {
                const updatedStudentData = response.data.data.map(student => ({
                    ...student,
                    image: StudentProfile  // Assign the static image to each student
                }));
                setStudentData(updatedStudentData);
            } else {
                console.error('No student data found or unsuccessful fetch');
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };
    useEffect(() => {
    fetchStudentData();
    }, []);  // Empty dependency array to ensure it runs only once after the component mounts

    useEffect(() => {
        // Sort studentData after it has been initialized
        studentData.sort((a, b) => {
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
    }, [studentData]);

    //AssignmentCourse
    const [assignmentData, setAssignmentData] = useState([]);
    const fetchAssignmentData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/assignmentCourse/${advisorID}`);
            if (response.data.success && response.data.data) {
                console.log('inside')
                setAssignmentData(response.data.data);  // Update state with fetched data
            } else {
                console.error('No assignment data found or unsuccessful fetch');
            }
        } catch (error) {
            console.error('Error fetching assignment data:', error);
        }
    };
    useEffect(() => {
        fetchAssignmentData();
    }, []);

    
    return (
        <div className='advisor-container'>
            <section className='section1'>
                <div className="container-grey advisor-box">
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Advisor</p>
                    <div className='advisorProfile'>
                        <img src={AdvisorProfile} alt="Advisor" />
                    </div>
                    <p style={{fontSize: '18px'}}>{advisorInfo.name || 'Loading...'}</p>
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
                                    key={student._id}  // Use student._id for the key if available, for better React performance
                                    onClick={() => handleStudentClick(student)}
                                    className='student-card-wrapper'
                                    tabIndex="0"
                                >
                                    <StudentCard
                                        title={student.title}
                                        image={student.image}
                                        name={student.name}
                                        status={student.status.toString()}  // Ensure status is a string if needed
                                        gpa={student.gpa.toString()}  // Ensure GPA is a string if needed
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
                                courseNumber={course.courseID}
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
                            <div className='top-of-notification'>
                            <p style={{fontSize: '20px', fontWeight: 'bold'}}>Notifications</p>
                            <Button className='noti-create-button' variant="primary" size='sm' onClick={handleShowNotiModal}>Create</Button>
                            </div>
                            
                            <div className='notification-list'>
                                {isLoading ? (
                                    <div className='loading-noti'>Loading notifications...</div>
                                ) : (
                                    notifications.map((notification, index) => (
                                        <NotificationCard
                                            key={index} // It's better to use notification._id if available for keys
                                            title={notification.title}
                                            description={notification.description}
                                            courseID={notification.courseID}
                                        />
                                    ))
                                )}
                            </div>


                        </div>

                        {/* Noti Modal */}
                        <Modal show={showNotiModal} onHide={handleCloseNotiModal}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{color: '#7949FF'}}>Create Notification</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className='chula-form'>
                                    <Form.Group className="mb-3" controlId="formCourseID">
                                        <Form.Label>Course ID</Form.Label>
                                        <Form.Control type="text" placeholder="Enter course ID" value={courseID} onChange={handleCourseIDChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formTitle">
                                        <Form.Label>Summary</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Summary" value={summary} onChange={handleSummaryChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
                                    </Form.Group>
                                    {submitError && <div className="text-danger">{submitError}</div>}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseNotiModal}>Close</Button>
                                <Button
                                variant={isSubmitting ? "secondary" : "primary"} // Change variant based on isSubmitting
                                onClick={handleSubmit}
                                disabled={isSubmitting} // Disable button while submitting
                                >
                                {isSubmitting ? (
                                    <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        style={{ marginRight: '5px' }}
                                    />
                                    Saving...
                                    </>
                                ) : 'Save Changes'}
                                </Button>

                            </Modal.Footer>
                        </Modal>


                        <div className='advisor-quest container-grey'>
                            <div className='top-of-quest'>
                                <p style={{fontSize: '20px', fontWeight: 'bold'}}>Quests</p>
                                <Button className='noti-create-button' variant="primary" size='sm' onClick={handleShowQuestModal} >Create</Button>
                            </div>
                            <div className='quest-list'>
                                {isLoading ? (
                                    <div className='loading-noti'>Loading notifications...</div>
                                ) : (
                                    assignmentData.map((quest, index) => (
                                            <QuestCard
                                            key={index}
                                            title={quest.title}
                                            description={quest.description}
                                            image={books}
                                            courseID={quest.courseID}
                                            time={quest.time}
                                            dueDate={quest.dueDate}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        <Modal show={showQuestModal} onHide={handleCloseQuestModal}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{color: '#7949FF'}}>Create Quest</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="chula-form">
                                    <Form.Group className="mb-3" controlId="formQuestCourseID">
                                        <Form.Label>Course ID</Form.Label>
                                        <Form.Control type="text" placeholder="Enter course ID" value={questCourseID} onChange={handleQuestCourseIDChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formQuestTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter title" value={questTitle} onChange={handleQuestTitleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formQuestDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter description" value={questDescription} onChange={handleQuestDescriptionChange} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseQuestModal}>Close</Button>
                                <Button variant="primary" onClick={handleQuestSubmit}>Save Changes</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </section>
            </Fade>
        </div>
    );
};

export default DashboardAdvisor;