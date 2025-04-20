import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import GameModel from '../../gamelogic/GameModel';
import EnemySide from './EnemySide';
import PlayerSide from './PlayerSide';
import "../styles/GamePage.css";

function GamePage(props){
    const location = useLocation();

    // Modelo de la partida
    const gameModel = new GameModel(location.state.playerCards, location.state.enemyCards);

    // Referencia para la música de fondo
    const backgroundMusicRef = useRef(new Audio("/assets/sounds/background.mp3"));

    // Estado de las cartas del jugador y del enemigo
    const [playerCards, setPlayerCards] = useState(gameModel.getPlayerCards());
    const [enemyCards, setEnemyCards] = useState(gameModel.getEnemyCards());
    const [playerCardsVersion, setPlayerCardsVersion] = useState(0);
    const [enemyCardsVersion, setEnemyCardsVersion] = useState(0);

    // Estado visible de la partida
    const [gameState, setGameState] = useState({
        startingTurn: gameModel.getCurrentTurn(),
        currentTurn: gameModel.getCurrentTurn(),
        playerPoints: 3 - gameModel.getEnemyCards().length,
        enemyPoints: 3 - gameModel.getPlayerCards().length,
        turn: gameModel.getTurn(),
    });

    const [enemyCardRef, setEnemyCardRef] = useState(null);

    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const [volume, setVolume] = useState(0.1);

    const toggleMusic = () => {
        const backgroundMusic = backgroundMusicRef.current;
        if (isMusicPlaying) {
            backgroundMusic.volume = 0; // Mute the music
            setVolume(0); // Set the slider to 0
        } else {
            backgroundMusic.volume = 0.1; // Restore default volume
            setVolume(0.1); // Update the slider to match the volume
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        const backgroundMusic = backgroundMusicRef.current;

        if (newVolume > 0) {
            setIsMusicPlaying(true); // Unmute if volume is increased
            backgroundMusic.volume = newVolume;
            backgroundMusic.play().catch((error) => {
                console.error("Error al reproducir la música de fondo:", error);
            });
        } else {
            setIsMusicPlaying(false); // Mute if volume is set to 0
            backgroundMusic.volume = 0;
        }
    };

    const useTurn = () => {
        // Cambia el turno entre el jugador y el enemigo
        if (gameState.currentTurn === 0) {
            setGameState({
                ...gameState,
                currentTurn: 1,
                turn: gameState.startingTurn === 1 ? gameState.turn + 1 : gameState.turn,
            });
        }
    };

    const handlePlayerCardsChange = (updatedCards) => {
        setPlayerCards(updatedCards);
    };

    const audio = new Audio("/assets/sounds/sound4.mp3");
    audio.volume = 0.4;

    const handlePlayerDamage = (damage) => {
        const updatedPlayerCards = [...playerCards];
        if (updatedPlayerCards[0].isDefending) {
            updatedPlayerCards[0].setHealth(updatedPlayerCards[0].getHealth() - damage + updatedPlayerCards[0].getDefense());
        } else {
            updatedPlayerCards[0].setHealth(updatedPlayerCards[0].getHealth() - damage);
        }
        updatedPlayerCards[0].resetDefense(); // Reinicia la defensa después de recibir daño
        if (updatedPlayerCards[0].getHealth() <= 0) {
            audio.play();
            updatedPlayerCards.shift(); // Elimina la carta si su salud es 0 o menos
        }
        setPlayerCards(updatedPlayerCards);
        setPlayerCardsVersion(playerCardsVersion + 1); // Forzar re-renderizado
        setGameState({
            ...gameState,
            enemyPoints: 3 - updatedPlayerCards.length, // Actualiza los puntos del enemigo
        });
    };

    const handleEnemyDamage = (damage) => {
        const updatedEnemyCards = [...enemyCards];
        updatedEnemyCards[0].setHealth(updatedEnemyCards[0].getHealth() - damage);
        if (updatedEnemyCards[0].getHealth() <= 0) {
            audio.play();
            updatedEnemyCards.shift(); // Elimina la carta si su salud es 0 o menos
        }
        setEnemyCards(updatedEnemyCards);
        setEnemyCardsVersion(enemyCardsVersion + 1); // Forzar re-renderizado
        setGameState({
            ...gameState,
            playerPoints: 3 - updatedEnemyCards.length, // Actualiza los puntos del jugador
        });
    };

    useEffect(() => {
        const backgroundMusic = backgroundMusicRef.current;
        backgroundMusic.loop = true;
        backgroundMusic.volume = volume;
        backgroundMusic.play().catch((error) => {
            console.error("Error al reproducir la música de fondo:", error);
        });

        // Detén la música cuando el componente se desmonte
        return () => {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0; // Reinicia la música
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    useEffect(() => {
        if (gameState.currentTurn === 1) {
            const timer = setTimeout(() => {
                // Anima la carta enemiga primero
                if (enemyCardRef && enemyCards.length > 0) {
                    enemyCardRef.animateAttack();

                    // Después aplica el daño
                    setTimeout(() => {
                        // El enemigo ataca siempre cada 2 segundos
                        handlePlayerDamage(enemyCards[0].getAttackDamage());
                        // Usar una función en setGameState para asegurar el estado actual
                        setGameState({
                            ...gameState,
                            currentTurn: 0,
                            turn: gameState.startingTurn === 0 ? gameState.turn + 1 : gameState.turn,
                        });
                    }, 500);
                }
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [gameState.currentTurn, enemyCardRef]);

    return (
        <div className="game-page">
            <div className="music-controls">
                <img
                    src={isMusicPlaying ? "/assets/images/image8.png" : "/assets/images/image9.png"}
                    alt="Toggle Music"
                    className="music-toggle"
                    onClick={toggleMusic}
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
            <EnemySide
                cards={enemyCards}
                points={3 - playerCards.length}
                attachCardRef={setEnemyCardRef}
                version={enemyCardsVersion}
            />
            <div className="turn-section">
                <div className="turn-counter">
                    Turno: {gameState.turn}
                </div>
                <hr />
                <div className="turn-indicator">
                    {gameState.currentTurn === 0 ? "Tu turno" : "Turno del rival"}
                </div>
            </div>
            <PlayerSide
                cards={playerCards}
                points={3 - enemyCards.length}
                onEndTurn={useTurn}
                currentTurn={gameState.currentTurn}
                onEnemyDamage={handleEnemyDamage}
                onPlayerCardsChange={handlePlayerCardsChange}
                version={playerCardsVersion}
                enemyCards={enemyCards}
                setEnemyCards={setEnemyCards}
            />
        </div>
    );
}

export default GamePage;