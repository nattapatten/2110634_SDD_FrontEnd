/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { Button, Fade } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./DashboardStudent.css";
import AdvisorProfile from "../assets/AdvisorProfile.png";
import MissionCard from "../components/MissionCard";
import books from "../assets/books.png";
import homework from "../assets/homework.png";
import NotificationCard from "../components/NotificationCard";
import QuestCard from "../components/QuestCard";
import MissionInfoCard from "../components/MissionInfoCard";
import StudentAllCourses from "../components/StudentAllCourses";
import AchievementBandages from "../components/AchievementBandages";
import axios from "axios";

const DashboardStudent = () => {
  //#region Mock Data
  const advisorID = "ADV002";
  const baseURL = "http://127.0.0.1:4000";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [studentProfileData, setStudentProfileData] = useState(null);
  const [studentSelectPathData, setStudentSelectPathData] = useState(null);

  const fetchStudentProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${baseURL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.success && response.data.data) {
        setStudentProfileData(response.data.data);
        console.log("Current Login:", response.data.data);
        fetchStudentPathData(response.data.data.studentID); // Call to fetch path data here
      } else {
        setError("No student data found or unsuccessful fetch");
      }
    } catch (error) {
      setError(error.message || "Failed to fetch data");
    }
    setLoading(false);
  };

  const fetchStudentPathData = async (studentID) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("studentProfileData.studentID :", studentID);
      const response = await axios.get(
        `${baseURL}/api/v1/studentDashboard/${studentID}/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response from select path :", response);
      if (response.status === 200 && response.data.success && response.data.student) {
        setStudentSelectPathData(response.data.student);
      } else {
        setError("No student path data found or unsuccessful fetch");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudentProfileData();
  }, []);





  const BandageData = [
    {
      courseID: "2110634",
      courseName: "Math for Software Engineering",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110645",
      courseName: "Advanced Algorithms",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110656",
      courseName: "System Architecture Design",
      Grade: "B+",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110691",
      courseName: "Cloud Computing",
      Grade: "C+",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110692",
      courseName: "Cloud Computing",
      Grade: "D",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110690",
      courseName: "Cloud Computing",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110634",
      courseName: "Math for Software Engineering",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110645",
      courseName: "Advanced Algorithms",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110656",
      courseName: "System Architecture Design",
      Grade: "B+",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110691",
      courseName: "Cloud Computing",
      Grade: "C+",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110692",
      courseName: "Cloud Computing",
      Grade: "D",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110690",
      courseName: "Cloud Computing",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110634",
      courseName: "Math for Software Engineering",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110645",
      courseName: "Advanced Algorithms",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110656",
      courseName: "System Architecture Design",
      Grade: "B+",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110691",
      courseName: "Cloud Computing",
      Grade: "C+",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110692",
      courseName: "Cloud Computing",
      Grade: "D",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110690",
      courseName: "Cloud Computing",
      Grade: "A",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110699",
      courseName: "Thesis",
      Grade: "pass",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
    {
      courseID: "2110670",
      courseName: "Comprehensive Test",
      Grade: "pass",
      image: "course Icon Image",
      dueDate: "2024-02-05T11:15:00",
      submitDate: "2024-02-04T11:15:00",
    },
  ];
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

  const studentData = [
    {
      title: "Passed",
      image: homework,
      path: "Software Engineer",
      name: "Math for Software Engineering",
      studentID: "11111111",
      status: "100",
      gpa: "B+",
      lastUpdated: "2023-12-15T08:30:00",
    },
    {
      title: "Passed",
      image: homework,
      path: "Project Manager",
      name: "Project Manager",
      studentID: "22222222",
      status: "100",
      gpa: "A",
      lastUpdated: "2023-11-30T14:45:00",
    },
    {
      title: "Studying",
      image: homework,
      path: "Software Engineer",
      name: "Advanced Algorithms",
      studentID: "33333333",
      status: "70",
      gpa: "-",
      lastUpdated: "2024-01-10T10:20:00",
    },
    {
      title: "Studying",
      image: homework,
      path: "Software Engineer",
      name: "System Architecture Design",
      studentID: "44444444",
      status: "80",
      gpa: "-",
      lastUpdated: "2024-02-05T11:15:00",
    },
    {
      title: "Passed",
      image: homework,
      path: "DevOps Engineer",
      name: "Cloud Computing",
      studentID: "55555555",
      status: "100",
      gpa: "A",
      lastUpdated: "2023-10-20T09:00:00",
    },
    {
      title: "Studying",
      image: homework,
      path: "Software Engineer",
      name: "Basic Network",
      studentID: "66666666",
      status: "60",
      gpa: "-",
      lastUpdated: "2024-03-15T13:30:00",
    },
    {
      title: "Withdraw",
      image: homework,
      path: "Software Engineer",
      name: "Data Structure",
      studentID: "77777777",
      status: "50",
      gpa: "W",
      lastUpdated: "2023-12-01T16:00:00",
    },
    {
      title: "Studying",
      image: homework,
      path: "Software Engineer",
      name: "Computer Programming",
      studentID: "88888888",
      status: "40",
      gpa: "-",
      lastUpdated: "2024-04-05T09:45:00",
    },
    {
      title: "Studying",
      image: homework,
      path: "Software Engineer",
      name: "Java Programming",
      studentID: "12345678",
      status: "30",
      gpa: "-",
      lastUpdated: "2024-02-25T14:00:00",
    },
    {
      title: "Withdraw",
      image: homework,
      path: "Software Engineer",
      name: "Web Programming",
      studentID: "12345678",
      status: "20",
      gpa: "W",
      lastUpdated: "2023-11-15T10:30:00",
    },
    // Add more student data objects with lastUpdated field including time
  ];

  const notificationData = [
    {
      courseID: "2110634",
      title: "New Student Registration",
      description:
        "A new student, Emily Johnson, has successfully completed her registration process for the upcoming academic year under your advisement. Emily is pursuing a degree in Computer Science with a focus on artificial intelligence. It is essential to review her academic file, previous coursework, and plan an initial meeting to discuss her academic goals, course selections, and any specific needs or accommodations she may require.",
    },
    {
      courseID: "2110645",
      title: "Grade Alert: Low Performance",
      description:
        "Student John Smith's performance in the Calculus II course has recently dropped below the academic satisfactory threshold, with his latest test scores indicating a potential risk of failing. This situation calls for a proactive approach to understand the challenges John is facing and to develop an intervention plan. Suggestions include arranging tutoring sessions, discussing study habits, and possibly considering course withdrawal before the deadline to avoid an adverse impact on his GPA.",
    },
    {
      courseID: "2110645",
      title: "Scholarship Application Deadline",
      description:
        "The deadline for the upcoming academic scholarship applications is quickly approaching on April 30th. There are several scholarships available that target students excelling in academic performance, demonstrating community service, or in need of financial aid. Please make an effort to remind your eligible students to prepare their applications, ensuring they include all required documents and personal statements. Holding a brief workshop on how to write a compelling application could significantly benefit our students.",
    },
    {
      courseID: "2110656",
      title: "Updated Course Catalog",
      description:
        "The course catalog for the next academic year has been thoroughly updated, including several new courses that reflect the latest trends and technologies in the field of computer science, such as Advanced Machine Learning, Cybersecurity Ethics, and Blockchain Fundamentals. Please take the time to review these updates and discuss with your advisees how these new courses could fit into their academic and career plans, particularly those students who are nearing the completion of their degree requirements.",
    },
    {
      courseID: "2110656",
      title: "Internship Opportunities",
      description:
        "Our department has recently partnered with several leading tech companies to offer new internship opportunities in software development, data analysis, and cybersecurity. These internships not only provide valuable hands-on experience but also offer potential pathways to full-time positions upon graduation. Encourage students, especially those in their junior and senior years, to apply by May 15th. Assistance with resume writing and interview preparation is available through our career services office.",
    },
    {
      courseID: "2110656",
      title: "Student Withdrawal Notice",
      description:
        "Student Alice Williams has formally notified the administration of her decision to withdraw from the semester due to personal health reasons. Alice was making satisfactory progress in her studies, and her decision was not made lightly. Please update your records to reflect this change and reach out to Alice to offer support and discuss plans for her return to her studies, ensuring she is aware of the resources available to her during this time.",
    },
    {
      courseID: "2110690",
      title: "Advisory Meeting Schedule",
      description:
        "The next advisory board meeting is scheduled for June 5th at 10:00 AM in the main conference hall. The meeting's agenda includes critical discussions on curriculum updates, strategies for increasing student engagement and retention, and the integration of new educational technologies into our teaching methodologies. Your participation and insights into these topics are highly valued, and you are encouraged to submit any additional items for discussion ahead of the meeting.",
    },
    {
      courseID: "2110690",
      title: "Final Exam Schedules Posted",
      description:
        "The final exam schedules for this semester have now been posted on the university portal. These exams are a crucial component of the academic assessment process, and it is vital that all students are aware of their exam times, locations, and the materials permitted in the exam room. Please ensure your advisees review their schedules promptly and begin their preparations early to avoid any last-minute stress. Consider hosting review sessions for courses with historically high rates of difficulty.",
    },
    {
      courseID: "2110690",
      title: "Student Achievement",
      description:
        "We are thrilled to announce that your advisee, Mark Lee, has won the prestigious National Coding Competition, showcasing his exceptional skills in algorithm design and problem-solving. This remarkable achievement not only highlights Mark's talent and hard work but also brings honor and recognition to our department. We encourage you to acknowledge Mark's achievement, perhaps by featuring him in the department's newsletter or organizing a small celebration within the department to inspire his peers.",
    },
    {
      courseID: "2110690",
      title: "Summer Course Enrollment",
      description:
        "Enrollment for summer courses will begin next week, offering students the opportunity to advance their studies, explore new interests, or catch up on credits needed for graduation. The summer session provides a range of courses, including some that are typically highly subscribed during the regular semesters. Discuss with your students whether taking summer courses aligns with their academic plans, particularly those who may benefit from the smaller class sizes and more intensive study environment.",
    },
  ];


  //#endregion

  studentData.sort((a, b) => {
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const [showNotificationsAndQuests, setShowNotificationsAndQuests] =
    useState(true);
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [showQuestModal, setShowQuestModal] = useState(false);

  // noti form state
  const [courseID, setCourseID] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  //noti modal
  const handleCloseNotiModal = () => setShowNotiModal(false);
  const handleShowNotiModal = () => setShowNotiModal(true);

  //noti input onchange fn
  const handleCourseIDChange = (e) => setCourseID(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  //noti submit
  const handleSubmit = () => {
    const formData = {
      courseID,
      summary,
      description,
    };
    console.log("inside noti");
    // Process formData here (e.g., update state or send to an API)
    console.log(formData); // Example action

    handleCloseNotiModal(); // Close modal after submission
    // Optionally reset form fields here if needed
  };

  // quest form state
  const [questCourseID, setQuestCourseID] = useState("");
  const [questTitle, setQuestTitle] = useState("");
  const [questDescription, setQuestDescription] = useState("");

  //quest modal
  const handleCloseQuestModal = () => setShowQuestModal(false);
  const handleShowQuestModal = () => setShowQuestModal(true);

  // Quest handler fn
  const handleQuestCourseIDChange = (e) => setQuestCourseID(e.target.value);
  const handleQuestTitleChange = (e) => setQuestTitle(e.target.value);
  const handleQuestDescriptionChange = (e) =>
    setQuestDescription(e.target.value);

  //quest submit
  const handleQuestSubmit = () => {
    const currentTime = "2024-04-12 05:12:07"; // Replace this with dynamic time if needed

    const formData = {
      questCourseID,
      questTitle,
      questDescription,
      time: currentTime, // Add the current time here
    };
    console.log("inside quest");
    console.log(formData); // This will now include the current time

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

  //AssignmentCourse
  const [assignmentData, setAssignmentData] = useState([]);
  const fetchAssignmentData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/assignmentCourse/getByAdvisor/${advisorID}`
      );
      if (response.data.success && response.data.data) {
        console.log("inside");
        setAssignmentData(response.data.data); // Update state with fetched data
      } else {
        console.error("No assignment data found or unsuccessful fetch");
      }
    } catch (error) {
      console.error("Error fetching assignment data:", error);
    }
  };
  useEffect(() => {
    fetchAssignmentData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="advisor-container">
      <section className="section1">
        <div className="container-grey advisor-box">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>Student</p>
          <div className="advisorProfile">
            <img src={AdvisorProfile} alt="Advisor" />
          </div>
          <p style={{ fontSize: "15px" }}>
            {" "}
            <div>
              {studentProfileData ? (
                <div>
                  <p>{studentProfileData.name}</p>
                  {/* Add more data displays as needed */}
                </div>
              ) : (
                <div>No student data available.</div>
              )}
            </div>
          </p>
        </div>
        <div className="container-grey students-container">
          <div className="top-of-student-container">
            <p
              className="student-container-title"
              style={{ fontSize: "30px", fontWeight: "bold" }}
            >
              Main Mission<span style={{ fontSize: "40px" }}>📌</span>
            </p>

            {showStudentInfo && (
              <Button className="close-button" onClick={handleClose}>
                x
              </Button>
            )}
          </div>
          {showStudentInfo ? (
            <MissionInfoCard student={selectedStudent} onClose={handleClose} />
          ) : (
            <div className="student-list">
              {studentData.map((student, index) => (
                <div
                  key={index}
                  onClick={() => handleStudentClick(student)}
                  className="student-card-wrapper"
                  tabIndex="0"
                >
                  <MissionCard
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
        <div className="container-grey">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Student's Courses
          </p>
          <div className="all-courses-container">
            <StudentAllCourses
              studentID={selectedStudent.studentID}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
      <Fade in={showNotificationsAndQuests}>
        <section className={showNotificationsAndQuests ? "visible" : "hidden"}>
          {/* <div className="section_comulative container-grey">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Comulative Scores
            </p>
            <div className="chart-list-row">
              <Radialbar_Charts_Gradient
                staticValue={100}
                maxValue={200}
                label="Gauge 1"
              />
              <Radialbar_Charts_Gradient
                staticValue={10}
                maxValue={30}
                label="Gauge 2"
              />
              <Radialbar_Charts_Gradient
                staticValue={3}
                maxValue={4}
                label="Gauge 3"
              />
            </div>
          </div> */}
          {/* <br /> */}

          <div className="section_achievement container-grey">
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {" "}
              Achievements <span style={{ fontSize: "40px" }}>🏆</span>
            </p>
            <div className="archivement-list-row">
              <AchievementBandages BandageData={BandageData} />
            </div>
          </div>
          <br />

          {/* <div className="section2 container-grey">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Your Courses</p>
            <div className="course-list">
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
          </div> */}
          {/* <br />

          <br /> */}
          <div className="section3 ">
            <div className="advisor-notification container-grey">
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {" "}
                Notifications <span style={{ fontSize: "40px" }}>📢</span>
              </p>
              <div className="top-of-notification">
                {/* <p style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}> Notifications <span style={{ fontSize: "40px" }}>📢</span></p> */}
                {/* <Button
                  className="noti-create-button"
                  variant="primary"
                  size="sm"
                  onClick={handleShowNotiModal}
                >
                  Create
                </Button> */}
              </div>

              <div className="notification-list">
                {notificationData.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    title={notification.title}
                    description={notification.description}
                    courseID={notification.courseID}
                  />
                ))}
              </div>
            </div>

            {/* Noti Modal */}
            <Modal show={showNotiModal} onHide={handleCloseNotiModal}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#7949FF" }}>
                  Create Notification
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="chula-form">
                  <Form.Group className="mb-3" controlId="formCourseID">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter course ID"
                      value={courseID}
                      onChange={handleCourseIDChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Summary"
                      value={summary}
                      onChange={handleSummaryChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseNotiModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="advisor-quest container-grey">
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {" "}
                Your Upcoming Quests{" "}
                <span style={{ fontSize: "40px" }}>📜</span>
              </p>
              <div className="top-of-quest">
                {/* <Button
                  className="noti-create-button"
                  variant="primary"
                  size="sm"
                  onClick={handleShowQuestModal}
                >
                  Create
                </Button> */}
              </div>
              <div className="notification-list">
                {assignmentData.map((quest, index) => (
                  <QuestCard
                    key={index}
                    title={quest.title}
                    description={quest.description}
                    image={quest.image}
                    courseID={quest.courseID}
                    time={quest.time}
                    dueDate={quest.dueDate}
                  />
                ))}
              </div>
            </div>
            <Modal show={showQuestModal} onHide={handleCloseQuestModal}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#7949FF" }}>
                  Create Quest
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="chula-form">
                  <Form.Group className="mb-3" controlId="formQuestCourseID">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter course ID"
                      value={questCourseID}
                      onChange={handleQuestCourseIDChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formQuestTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={questTitle}
                      onChange={handleQuestTitleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formQuestDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      value={questDescription}
                      onChange={handleQuestDescriptionChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseQuestModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleQuestSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default DashboardStudent;
