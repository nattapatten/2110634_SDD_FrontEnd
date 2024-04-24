import React, { useState } from 'react';
import './AchievementBandages.css';
// import '../assets/Bandage_Icon/book.png'



function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../assets/Bandage_Icon', false, /\.(png|jpe?g|svg)$/));



//Mock Data
// const BandageData = [
//     {
//         courseID: "2110634",
//         courseName: "Math for Software Engineering",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",

//     }]


function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick={onClose} className="btn btn-secondary">Close</button>
                </div>

                <div className="modal-body">
                    <p style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>Achievements Detail</p>
                    {children}
                </div>
            </div>
        </div>
    );
}

// function AchievementBandages({ BandageData })
function AchievementBandages({ BandageData }) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);


    const handleImageClick = (achievement) => {
        setSelectedAchievement(achievement);
        setModalShow(true);
    };

    // Grouping and counting grades by course
    // Calculate the total number of "Grade A"

    // console.log("AchievementBandages simplifiedCourses", BandageData[0].simplifiedCourses)
    // console.log("AchievementBandages simplifiedAssignments", BandageData[1].simplifiedAssignments)


    // const totalA = BandageData.reduce((acc, course) => acc + (course.GradeLetter === 'A' ? 1 : 0), 0);

    const totalA = BandageData[0].simplifiedCourses.reduce((acc, course) => acc + (course.GradeLetter === 'A' && course.EnrollStatus != 'Not Enroll' ? 1 : 0), 0);

    const thesisPass = BandageData[0].simplifiedCourses.some(course => course.CourseName === "Thesis" && course.GradeLetter.toLowerCase() === "pass");

    const comprehensivePass = BandageData[0].simplifiedCourses.some(course => course.courseName === "Comprehensive Test" && course.Grade.toLowerCase() === "pass");


    const enroll_corse = BandageData[0].simplifiedCourses.reduce((acc, course) => acc + (course.EnrollStatus != 'Not Enroll' ? 1 : 0), 0);



    const activeCourses = BandageData[0].simplifiedCourses.filter(course => course.EnrollStatus !== 'Not Enroll');

    // console.log("activeCourses", activeCourses);

    // Group assignments by course and check time conditions
    const assignmentsByCourse = BandageData[1].simplifiedAssignments.reduce((acc, assignment) => {
        const due = new Date(assignment.DueDate);
        const submitted = assignment.SubmittedDate ? new Date(assignment.SubmittedDate) : null;

        if (!acc[assignment.CourseID]) {
            acc[assignment.CourseID] = [];
        }
        acc[assignment.CourseID].push({ submitted, due });
        return acc;
    }, {});

    // console.log("assignmentsByCourse" , assignmentsByCourse);

    const coursesEligibleForBandage = Object.keys(assignmentsByCourse).filter(courseID => {
        const isCourseActive = activeCourses.some(course => course.CourseID === courseID);
        const allOnTime = assignmentsByCourse[courseID].some(({ submitted, due }) => {
            // console.log(`Course ID: ${courseID}, Submitted: ${submitted}, Due: ${due}`);
            return submitted && submitted <= due;
        });
        // console.log(`Is course ${courseID} active: ${isCourseActive} and all assignments on time: ${allOnTime}`);
        return isCourseActive && allOnTime;
    });



    // console.log("Total Count Grade A:", totalA);
    const achievements = [];

    if (thesisPass) {
        achievements.push({
            label: "Thesis Completion",
            image: images['thesis.png'],
            description: "Successfully passed the Thesis."
        });
    }

    if (comprehensivePass) {
        achievements.push({
            label: "Comprehensive Test Completion",
            image: images['list.png'],
            description: "Successfully passed the Comprehensive Test."
        });
    }

    // Decide which badge to display based on the total count of "A" grades
    if (totalA >= 1) {
        achievements.push({
            label: "Honor Roll",
            image: images['thumbs.png'],  // Corrected to 'thumb.png' assuming it was a typo
            description: 'Achieved top grades'
        });
    }
    if (totalA >= 5) {
        achievements.push({
            label: "Outstanding Scholar",
            image: images['medal.png'],
            description: 'Consistently high performance'
        });
    }

    if (enroll_corse >= 1) {
        // If there's at least one other achievement, add the participant badge
        achievements.push({
            label: "Participant",
            image: images['book.png'],
            description: "Participation in the courses."
        });
    }

    if (coursesEligibleForBandage.length >= 1) {
        achievements.push({
            label: "On Time Completion",
            image: images['clock.png'],
            description: "I'm always on time."
        });
    }


    return (
        <>
            {achievements.map((achievement, index) => (
                <div key={index} className="achievement-badge">
                    <img src={achievement.image} alt={achievement.label} onClick={() => handleImageClick(achievement)} />
                </div>
            ))}
            <Modal show={modalShow} onClose={() => setModalShow(false)}>
                <p>{selectedAchievement?.label}</p>
                <p>{selectedAchievement?.description}</p>
            </Modal>
        </>
    );
}

export default AchievementBandages;