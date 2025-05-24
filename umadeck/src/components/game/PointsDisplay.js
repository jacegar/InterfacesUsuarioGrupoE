import React from 'react';
import "../styles/game/PointsDisplay.css";

function PointsDisplay(props) {
    const { points} = props;

    return (
        <div className={"points-display "}>
            <h1 className="points-counter">{points} / 3</h1>
            <div className="circles-container">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className={"circle " + (index < points ? "golden" : "")}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default PointsDisplay;
