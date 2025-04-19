import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/GameOverWonPage.css";

function GameOverWonPage() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/'); // Redirige al menú principal
    };

    return (
        <div className="game-over-won-page">
            <h1>¡Has ganado!</h1>
            <button className="continue-button" onClick={handleContinue}>
                Regresar al menú principal
            </button>
        </div>
    );
}

export default GameOverWonPage;