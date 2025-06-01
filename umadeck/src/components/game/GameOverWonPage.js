import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/game/GameOverWonPage.css";
import { useEffect } from 'react';
import Player from '../../gamelogic/Player';

function GameOverWonPage() {
    const navigate = useNavigate();
    const executedRef = React.useRef(false);
    const location = useLocation();
    const volume = location.state.volume || 0;

    const audio = new Audio("/assets/sounds/sound2.mp3");
    audio.volume = 0.05;
    if (volume > 0) {
        audio.play();
    }

    const handleContinue = () => {
        navigate('/');
    };

    useEffect(() => {
        if (executedRef.current) return;
        executedRef.current = true;
        const player = new Player();
        player.updateAchievementProgress('win1', 100);
        player.updateAchievementProgress('win5', 20);
    }, []);

    return (
        <div className="game-over-won-page">
            <h1>¡Has ganado!</h1>
            <button className="continue-button-won" onClick={handleContinue}>
                Regresar al menú principal
            </button>
        </div>
    );
}

export default GameOverWonPage;