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

    const [questDueDate, setQuestDueDate] = useState('');
    const [questTime, setQuestTime] = useState('');

    //quest submit
    const handleQuestSubmit = async () => {
        // Use the current date and time in ISO format for the time field
        const currentTime = new Date().toISOString();
    
        const formData = {
            courseID: questCourseID,
            title: questTitle,
            description: questDescription,
            time: currentTime,  // Automatically set to current time
            dueDate: questDueDate
        };
    
        setIsLoading(true); // Start loading indicator
        try {
            const response = await axios.post(`${baseURL}/api/v1/assignmentCourse/`, formData);
            console.log('Quest submitted successfully:', response.data);
    
            // Optionally, update your quests list in state to include the new quest
            setQuests(prevQuests => [...prevQuests, response.data.data]);
    
            // Reset form fields
            setQuestCourseID('');
            setQuestTitle('');
            setQuestDescription('');
            setQuestDueDate('');
            handleCloseQuestModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Failed to submit quest:', error);
            // Optionally set an error message in state to display in the UI
        }
        setIsLoading(false); // Stop loading indicator
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
            const response = await axios.get(`${baseURL}/api/v1/assignmentCourse/getByAdvisor/${advisorID}`);
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
                                    <Form.Group className="mb-3" controlId="formQuestDueDate">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control type="datetime-local" value={questDueDate} onChange={e => setQuestDueDate(e.target.value)} />
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