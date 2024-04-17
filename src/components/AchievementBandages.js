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

//     },
//     {
//         courseID: "2110645",
//         courseName: "Advanced Algorithms",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110656",
//         courseName: "System Architecture Design",
//         Grade: "B+",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110691",
//         courseName: "Cloud Computing",
//         Grade: "C+",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110692",
//         courseName: "Cloud Computing",
//         Grade: "D",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110690",
//         courseName: "Cloud Computing",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110634",
//         courseName: "Math for Software Engineering",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110645",
//         courseName: "Advanced Algorithms",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110656",
//         courseName: "System Architecture Design",
//         Grade: "B+",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110691",
//         courseName: "Cloud Computing",
//         Grade: "C+",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110692",
//         courseName: "Cloud Computing",
//         Grade: "D",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110690",
//         courseName: "Cloud Computing",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110634",
//         courseName: "Math for Software Engineering",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110645",
//         courseName: "Advanced Algorithms",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110656",
//         courseName: "System Architecture Design",
//         Grade: "B+",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110691",
//         courseName: "Cloud Computing",
//         Grade: "C+",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110692",
//         courseName: "Cloud Computing",
//         Grade: "D",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110690",
//         courseName: "Cloud Computing",
//         Grade: "A",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110699",
//         courseName: "Thesis",
//         Grade: "pass",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     },
//     {
//         courseID: "2110670",
//         courseName: "Comprehensive Test",
//         Grade: "pass",
//         image: "course Icon Image",
//         dueDate:"2024-02-05T11:15:00",
//         submitDate:"2024-02-04T11:15:00",
//     }
// ];





function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick={onClose}>Close</button>
                </div>

                <div className="modal-body">
                    <p style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>Achievements Detail</p>
                    {children}
                </div>
            </div>
        </div>
    );
}


function AchievementBandages({ BandageData }) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const handleImageClick = (achievement) => {
        setSelectedAchievement(achievement);
        setModalShow(true);
    };

    // Grouping and counting grades by course
    // Calculate the total number of "Grade A"
    const totalA = BandageData.reduce((acc, course) => acc + (course.Grade === 'A' ? 1 : 0), 0);

    const thesisPass = BandageData.some(course => course.courseName === "Thesis" && course.Grade.toLowerCase() === "pass");


    const comprehensivePass = BandageData.some(course => course.courseName === "Comprehensive Test" && course.Grade.toLowerCase() === "pass");

    const onTimeSubmissions = BandageData.filter(course => {
        const due = new Date(course.dueDate);
        const submitted = new Date(course.submitDate);
        return submitted <= due;
    });



    console.log("Total Count Grade A:", totalA);
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

    // Adding a default participant badge if no A's are found
    if (achievements.length >= 1) {
        // If there's at least one other achievement, add the participant badge
        achievements.push({
            label: "Participant",
            image: images['book.png'],
            description: "Participation in the courses."
        });
    }

    if (onTimeSubmissions.length >=5) {
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
                <h2>{selectedAchievement?.label}</h2>
                <p>{selectedAchievement?.description}</p>
            </Modal>
        </>
    );
}

export default AchievementBandages;