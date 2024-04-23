import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import './StarStatusBar.css';

function GpaStarRating({ gpa, enableFlag }) {
    const [rating, setRating] = useState(0);

    // Update the rating whenever the GPA changes
    useEffect(() => {
        setRating(convertGpaToStars(gpa));
    }, [gpa]);

    const changeRating = (newRating) => {
        if (enableFlag) {
            setRating(newRating);
        }
    };

    return (
        <div>
            <StarRatings
                 rating={rating}
                 starRatedColor="gold"
                 changeRating={enableFlag ? changeRating : undefined}
                 numberOfStars={5}
                 starDimension="25px"
                 starSpacing="2px"
                 starHoverColor={enableFlag ? "blue" : "gold"}
                 isSelectable={enableFlag}
                 className={enableFlag ? 'glow' : 'no-glow'}  // Assuming 'no-glow' is another CSS class for non-interactive state
            />
        </div>
    );
}

// Helper function to convert GPA to a star rating
function convertGpaToStars(gpa, maxStars = 5) {
    const maxGPA = 4.0;  // Adjust this if your GPA scale is different
    if (typeof gpa !== 'number' || isNaN(gpa)) return 0;  // Handle undefined or non-numeric GPA
    return Math.min((gpa / maxGPA) * maxStars, maxStars);  // Ensure it doesn't exceed maxStars
}

export default GpaStarRating;
