import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import "../styles/game/GameOverLost.css";

function GameOverLostPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const volume = location.state.volume || 0;

    const audio = new Audio("/assets/sounds/sound3.mp3");
    audio.volume = 0.05;
    if (volume > 0) {
        audio.play();
    }

    const handleContinue = () => {
        navigate('/');
    };

    return (
        <div className="game-over-lost-page">
            <h1>Has perdido</h1>
            <button className="continue-button-lost" onClick={handleContinue}>
                Regresar al menú principal
            </button>
        </div>
    );
}

export default GameOverLostPage;