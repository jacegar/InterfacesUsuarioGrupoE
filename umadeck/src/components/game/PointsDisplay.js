import React from 'react';
import "../styles/PointsDisplay.css";

function PointsDisplay(props) {
    const { points, side } = props;

    return (
        <div className={"points-display " + (side === 0 ? "player" : "enemy")}>
            <p>{points} / 3</p>
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
