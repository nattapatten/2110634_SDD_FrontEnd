/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { Button, Fade } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./DashboardStudent.css";
import AdvisorProfile from "../assets/AdvisorProfile.png";
import MissionCard from "../components/MissionCard.js";
import books from "../assets/books.png";
import homework from "../assets/homework.png";
import NotificationCard from "../components/NotificationCard.js";
import QuestCard from "../components/QuestCard.js";
import MissionInfoCard from "../components/MissionInfoCard.js";
import StudentAllCourses from "../components/StudentAllCourses.js";
import AchievementBandages from "../components/AchievementBandages.js";
import axios from "axios";
import MissionAssignment from "../components/MissionAssignment.js";
import { GiConsoleController } from "react-icons/gi";
import StudentQuestCard from "../components/StudentQuestCard.js";
import StarStatusBar from "../components/StarStatusBar.js";
import { TbRulerOff } from "react-icons/tb";
import { BandageData, notificationData } from "../datas/data.js";
import EnrollmentModal from "../components/EnrollmentModal";
import { el } from "date-fns/locale";

const DashboardStudent = () => {
  const advisorID = "ADV002";
  const baseURL = "http://127.0.0.1:4000";

  const enableEditing = false; // Set this to false to make the rating static

  const EnrollStatusEnum = {
    0: "Not Enroll",
    1: "Enroll",
    2: "Withdraw",
    3: "Pass",
  };

  const [studentProfileData, setStudentProfileData] = useState(null);
  const [selectedStudentID, setStudentID] = useState(null);
  const [coursesNotifications, setNotifications] = useState([]);
  // const [selectedStudentID, setStudentID] = useState({ studentID: null, studentObjectID: null });
  // Adding coursesAssignment to the initial state structure
  const [studentSelectPathData, setStudentSelectPathData] = useState({
    student: { courses: [] },
    coursesAssignment: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentProfileData = async () => {
    setLoading(true);
    setError(null);
    console.log("Fetching student profile data...");
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${baseURL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (
        response.status === 200 &&
        response.data.success &&
        response.data.data
      ) {
        setStudentProfileData(response.data.data);
        fetchStudentPathData(response.data.data.studentID); // Call to fetch path data here
        fetchNotifications(response.data.data.studentID);
        // console.log("Current Profile Data", response.data)
        console.log("setStudentProfileData:", studentProfileData);

        if (response.data.data.studentID) {
          setStudentID(response.data.data.studentID);
          // setStudentID({ studentID: response.data.data.studentID, studentObjectID: response.data.data._id });
          console.log(
            "response.data.data.studentID",
            response.data.data.studentID
          );
        } else {
          console.log("setStudentID Was null");
        }
      } else {
        setError("No student data found or unsuccessful fetch");
      }
    } catch (error) {
      setError(error.message || "Failed to fetch data");
      console.error("Fetch Profile Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => { }, [selectedStudentID]);

  const fetchStudentPathData = async (studentID) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${baseURL}/api/v1/studentDashboard/${studentID}/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data.success) {
        setStudentSelectPathData(response.data); // Assuming response.data includes both student and coursesAssignment
        console.log(
          "Updated State with courses and assignments:",
          response.data
        );
      } else {
        setError("No student path data found or unsuccessful fetch");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data");
      console.error("Fetch Path Error:", error);
    }
  };

  const fetchNotifications = async (studentIDs) => {
    console.log("fetchNotifications courseIDs", studentIDs);

    // Generate a query string that appends each courseID as a separate parameter
    const queryString = studentIDs;
    const endpoint = `${baseURL}/api/v1/notifications/by-student/${queryString}`;  // Set your API endpoint URL
    // console.log("endpoint", endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log("result noti", result.data);
      setNotifications(result.data);  // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };



  useEffect(() => {
    fetchStudentProfileData();
  }, []);



  const [selectedCourseAssignments, setSelectedCourseAssignments] = useState(
    []
  );
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourseID, setSelectedCourseID] = useState(null);

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

  const handleStudentClick = (mission) => {
    if (!mission) return; // Guard clause to handle undefined mission

    console.log("mission", mission);

    if (mission.EnrollStatus === "Not Enroll") {
      setModalOpen(true); // Open the modal when not enrolled
      setSelectedCourseID(mission.CourseID);
    } else {
      console.log("handleStudentClick", mission);
      setSelectedStudent(mission);
      setShowStudentInfo(true);
      setShowNotificationsAndQuests(false); // Hide Notifications and Quests

      if (simplifiedAssignments) {
        const filteredAssignments = simplifiedAssignments.filter(
          (assignment) => assignment.CourseID === mission.CourseID
        );
        console.log("filteredAssignments", filteredAssignments);
        setSelectedCourseAssignments(filteredAssignments);
      } else {
        console.log("No assignments to display");
      }
    }
  };
  useEffect(() => { }, [selectedCourseID]);

  const handleClose = () => {
    setShowStudentInfo(false);
    setSelectedStudent(null);
    setShowNotificationsAndQuests(true); // Show Notifications and Quests
  };

  const [enrollmentStatus, setEnrollmentStatus] = useState({ message: '', type: '' });

  const handleCloseModal = () => {
    setModalOpen(false);
    setEnrollmentStatus({ message: '', type: '' }); // Reset status on close
  };

  const handleEnroll = async (courseID, studentID, enrollStatus = "1") => {
    const apiUrl = `${baseURL}/api/v1/studentSelectPath/enrollStudentCourse`; // Your API endpoint

    console.log("Enroll Value:", courseID, studentID, enrollStatus);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentID: studentID,
          courseID: courseID,
          enrollStatus: enrollStatus,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Enrollment Successful", data);
        setEnrollmentStatus({ message: 'Enroll Successful', type: 'success' });
        fetchStudentProfileData();
      } else {
        throw new Error("Failed to enroll"); // Handle server errors or rejections
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      setEnrollmentStatus({ message: 'Enroll unsuccessful', type: 'error' });
    }
  };


  const studentDataPath = studentSelectPathData?.student;

  const studentCourses = studentSelectPathData?.student?.courses;

  const studentCoursesAssignment = studentSelectPathData?.coursesAssignment;

  const listCoursesPath = studentCourses.map((listData) => listData);
  const listCoursesDetail = studentCoursesAssignment.map(
    (listData) => listData.courseDetails
  );
  const listCoursesAssignments = studentCoursesAssignment.map(
    (listData) => listData.assignments
  );
  const listStudentAssignments = studentCoursesAssignment.map(
    (listData) => listData.studentAssignments
  );

  // console.log("studentDataPath", studentDataPath);
  // console.log("listCoursesPath", listCoursesPath);
  // console.log("listCoursesDetail", listCoursesDetail);
  // console.log("listCoursesAssignments", listCoursesAssignments);
  // console.log("listStudentAssignments", listStudentAssignments);

  const joinedCourses = listCoursesPath.map((path) => {
    const details = listCoursesDetail.find(
      (detail) => detail.courseID === path.courseID//detail._id === path.course_ObjectID
    );
    return { ...path, courseDetails: details };
  });
  // console.log("joinedCourses", joinedCourses);

  const simplifiedCourses = joinedCourses.map((course) => ({
    CourseID: course.courseID,
    CourseObjectID: course.course_ObjectID,
    CourseName: course.courseDetails.courseName,
    MaxStudents: course.courseDetails.maxStudents,
    CurrentStudents: course.courseDetails.currentStudents, // Assuming you want this too
    //GradePercentage: course.gradePercentage,
    GradePercentage: course.courseStatus,
    // GradeLetter: course.gradeLetter,
    GradeLetter: course.courseGpa,
    EnrollStatus: EnrollStatusEnum[course.enrollStatus] || "Status Unknown", //course.enrollStatus,
    image: homework,
  }));

  console.log("Simplified Courses:", simplifiedCourses);

  function mergeAssignments(courseAssignments, studentAssignments) {
    return courseAssignments.map((courseGroup, index) => {
      return courseGroup.map((assignment) => {
        // Find the corresponding student assignment
        const studentAssignment = studentAssignments[index].find(
          (sa) => sa.assignmentCourse_ObjectID === assignment._id
        );

        // Return a new object merging the assignment with its student details, if any
        return {
          ...assignment,
          studentDetails: studentAssignment || null, // Include student details if found, else null
        };
      });
    });
  }

  const mergedAssignments = mergeAssignments(
    listCoursesAssignments,
    listStudentAssignments
  );
  // console.log("mergedAssignments", mergedAssignments);

  const flatMergedAssignments = mergedAssignments.flat();

  // console.log("flatMergedAssignments: ", flatMergedAssignments)
  // Transforming merged data into the simplified structure
  const simplifiedAssignments = flatMergedAssignments.map((course) => {
    // Handling cases where studentDetails may be null
    const studentDetails = course.studentDetails
      ? {
        GradePercentage: course.studentDetails.score,
        submittedDate: course.studentDetails.submittedDate,
      }
      : {
        GradePercentage: null, // or a default value
        submittedDate: null, // or a default value
      };
    // console.log("studentDetails",studentDetails)
    return {
      AssignmentID: course._id,
      CourseID: course.courseID,
      Title: course.title,
      Description: course.description,
      GradePercentage: studentDetails.GradePercentage,
      // GradeLetter: course.gradeLetter, // This should be derived from somewhere, here assumed to be available
      DueDate: course.dueDate,
      SubmittedDate: studentDetails.submittedDate,
      Image: homework, // Assuming 'homework' is a placeholder or predefined variable
    };
  });

  console.log("simplifiedAssignments: ", simplifiedAssignments);
  console.log("selectedCourseAssignments", selectedCourseAssignments);
  console.log("studentDataPath.gpa", studentDataPath.gpa);
  console.log("studentProfileData Before Return", studentProfileData);



  //Start Set Your Upcoming Quest Data
  const activeCourses = simplifiedCourses.filter(course => course.EnrollStatus !== 'Not Enroll' && course.EnrollStatus !== 'Withdraw');
  const activeCourseIDs = activeCourses.map(course => course.CourseID);

  console.log("activeCourses", activeCourses);

  const topAssignments = simplifiedAssignments
    .filter(assignment => activeCourseIDs.includes(assignment.CourseID))
    .sort((a, b) => new Date(a.DueDate) - new Date(b.DueDate))
    .slice(0, 10);
  //End Set Your Upcoming Quest Data




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="student-dashboard-advisor-container">
      <section className="student-dashboard-section1">
        <div className="container-grey student-dashboard-advisor-box">
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
                  <StarStatusBar
                    gpa={studentSelectPathData?.student.gpa ?? 0}
                    enableFlag={enableEditing}
                  />
                  {/* <br></br> */}
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    GPA : {studentSelectPathData?.student.gpa ?? 0}
                  </p>
                  {/* Add more data displays as needed */}
                </div>
              ) : (
                <div>No student data available.</div>
              )}
            </div>
          </p>
        </div>
        <div className="container-grey student-dashboard-students-container">
          <div className="top-of-student-container">
            <p
              className="student-container-title"
              style={{ fontSize: "30px", fontWeight: "bold" }}
            >
              {studentSelectPathData?.student.pathName ?? 0} - Main Mission<span style={{ fontSize: "40px" }}>📌</span>
            </p>

            {showStudentInfo && (
              <Button className="close-button" onClick={handleClose}>
                x
              </Button>
            )}
          </div>
          {showStudentInfo ? (
            <MissionInfoCard mission={selectedStudent} onClose={handleClose} />
          ) : (
            <div className="student-dashboard-student-list">
              {simplifiedCourses.map((mission, index) => (
                <div
                  // key={index}
                  key={mission.CourseID}
                  onClick={() => handleStudentClick(mission)}
                  className="student-card-wrapper"
                  tabIndex="0"
                >
                  <MissionCard
                    // title={student.EnrollStatus}
                    title={mission.EnrollStatus}
                    image={mission.image}
                    courseID={mission.CourseID}
                    name={mission.CourseName}
                    status={mission.GradePercentage}
                    gpa={mission.GradeLetter}
                  />
                </div>
              ))}
              <EnrollmentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                // onEnroll={handleEnroll}
                onEnroll={() =>
                  handleEnroll(selectedCourseID, selectedStudentID, "1")
                } // '1' or any other status
                courseID={selectedCourseID}
                studentID={selectedStudentID}
                enrollmentStatus={enrollmentStatus}
              />
            </div>
          )}
        </div>
      </section>
      {showStudentInfo && (
        <div className="container-grey">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Your Mission Quests
          </p>
          <div className="all-courses-container"></div>
          <div className="notification-list">
            {selectedCourseAssignments.map((quest) => (
              <StudentQuestCard
                key={quest.AssignmentID} // More reliable key
                title={quest.Title}
                description={quest.Description}
                image={quest.Image}
                courseID={quest.CourseID}
                time={quest.SubmittedDate}
                dueDate={quest.DueDate}
              />
            ))}
          </div>
        </div>
      )}
      <Fade in={showNotificationsAndQuests}>
        <section className={showNotificationsAndQuests ? "visible" : "hidden"}>
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
              {/* <AchievementBandages BandageData={BandageData} /> */}
              <AchievementBandages BandageData={[{ simplifiedCourses }, { simplifiedAssignments }]} />
            </div>
          </div>
          <br />

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
              <div className="top-of-notification"></div>

              <div className="notification-list">
                {coursesNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id || notification._id} // Use unique identifier if available
                    title={notification.title}
                    description={notification.description}
                    courseID={notification.courseID}
                  />
                ))}
                {/* {notificationData.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    title={notification.title}
                    description={notification.description}
                    courseID={notification.courseID}
                  />
                ))} */}
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
                {/* {assignmentData.map((quest, index) => (
                  <QuestCard
                    key={index}
                    title={quest.title}
                    description={quest.description}
                    image={quest.image}
                    courseID={quest.courseID}
                    time={quest.time}
                    dueDate={quest.dueDate}
                  />
                ))} */}
                {topAssignments.map((quest) => (
                  <StudentQuestCard
                    key={quest.AssignmentID}
                    title={quest.Title}
                    description={quest.Description}
                    image={quest.Image}
                    courseID={quest.CourseID}
                    time={quest.SubmittedDate}
                    dueDate={quest.DueDate}
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
