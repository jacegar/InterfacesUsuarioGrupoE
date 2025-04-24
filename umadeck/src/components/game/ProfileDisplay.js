import React from 'react';
import "../styles/game/ProfileDisplay.css";

function ProfileDisplay(props) {
    const { side } = props;

    return (
        <div className={"profile-display " + (side === 0 ? "player" : "enemy")}>
            <img src="/assets/images/image6.png" alt="PFP"></img>
            <p>Username</p>
        </div>
    );
}

export default ProfileDisplay;