import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/GameOverLost.css";

function GameOverLostPage() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/'); // Redirige al menú principal
    };

    return (
        <div className="game-over-lost-page">
            <h1>Has perdido</h1>
            <button className="continue-button" onClick={handleContinue}>
                Continuar
            </button>
        </div>
    );
}

export default GameOverLostPage;