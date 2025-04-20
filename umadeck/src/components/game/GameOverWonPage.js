import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/GameOverWonPage.css";
import { useEffect } from 'react';
import Player from '../../gamelogic/Player';

function GameOverWonPage() {
    const navigate = useNavigate();

    const audio = new Audio("/assets/sounds/sound2.mp3");
        audio.volume = 0.05;
        audio.play(); // Reproducir el sonido

    const handleContinue = () => {
        navigate('/'); // Redirige al menú principal
    };

    useEffect(() => {
        const player = new Player();
        player.updateAchievementProgress('win1', 100);
        player.updateAchievementProgress('win5', 20);
    }, []);

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