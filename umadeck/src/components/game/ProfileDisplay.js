import React from 'react';
import "../styles/game/ProfileDisplay.css";

function ProfileDisplay(props) {
    const { side, username = side === 0 ? "Tú" : "Rival" } = props;

    return (
        <div className={"profile-display " + (side === 0 ? "player" : "enemy")}>
            <img src="/assets/images/image6.png" alt="PFP"></img>
            <p>{username}</p>
        </div>
    );
}

export default ProfileDisplay;