import React, { useState } from 'react';
import "../styles/game/ProfileDisplay.css";

function ProfileDisplay(props) {
    const { side, username = side === 0 ? "Tú" : "Rival" } = props;
    const [isEnlarged, setIsEnlarged] = useState(false);

    const handleImageClick = () => {
        setIsEnlarged(true);
    };

    const handleOverlayClick = () => {
        setIsEnlarged(false);
    };

    return (
        <>
            <div className={"profile-display " + (side === 0 ? "player" : "enemy")}>
                <img src="/assets/images/image6.png" alt="Foto de perfil del jugador" onClick={handleImageClick}></img>
                <p>{username}</p>
            </div>
            {isEnlarged && (
                <div className="profile-overlay" onClick={handleOverlayClick}>
                    <img className="profile-enlarged" src="/assets/images/image6.png" alt="PFP Enlarged" />
                </div>
            )}
        </>
    );
}

export default ProfileDisplay;