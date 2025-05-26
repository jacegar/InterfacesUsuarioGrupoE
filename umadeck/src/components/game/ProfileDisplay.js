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
                <img 
                    src="/assets/images/image6.png" 
                    alt="Foto de perfil del jugador" 
                    onClick={handleImageClick}
                    className="profile-photo"
                    tabIndex="0"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleImageClick();
                        }
                    }}
                ></img>
                <p>{username}</p>
            </div>
            {isEnlarged && (
                <div 
                    className="profile-overlay" 
                    onClick={handleOverlayClick}
                    tabIndex="0"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Tab') {
                            e.preventDefault();
                            handleOverlayClick();
                        }
                    }}
                    ref={(el) => el && el.focus()}
                    role="dialog"
                    aria-label="Foto de perfil ampliada"
                >
                    <img className="profile-enlarged" src="/assets/images/image6.png" alt="PFP Enlarged" />
                </div>
            )}
        </>
    );
}

export default ProfileDisplay;