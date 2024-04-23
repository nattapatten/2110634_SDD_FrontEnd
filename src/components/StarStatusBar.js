import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import './StarStatusBar.css';
function GpaStarRating({ gpa, enableFlag }) {
    const [rating, setRating] = useState(convertGpaToStars(gpa));

    const changeRating = (newRating) => {
        if (enableFlag) {
            setRating(newRating);
        }
    };

    return (
        <div>
            {/* <h2>GPA Star Rating</h2> */}
            <StarRatings
                 rating={rating}
                 starRatedColor="gold"
                 changeRating={enableFlag ? changeRating : undefined}
                 numberOfStars={5}
                 starDimension="25px"
                 starSpacing="2px"
                 starHoverColor={enableFlag ? "blue" : undefined}
                 isSelectable={enableFlag}
                 className={enableFlag ? 'glow' : 'glow'}
            />
            {/* <p>{enableFlag ? 'Interactive Rating' : 'Static Display'}</p> */}
        </div>
    );
}

// Helper function to convert GPA to a star rating
function convertGpaToStars(gpa, maxStars = 5) {
    const maxGPA = 4.0;  // Adjust this if your GPA scale is different
    return (gpa / maxGPA) * maxStars;
}

export default GpaStarRating;
