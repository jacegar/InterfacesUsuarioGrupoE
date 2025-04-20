import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameModel from '../../gamelogic/GameModel';
import EnemySide from './EnemySide';
import PlayerSide from './PlayerSide';
import "../styles/GamePage.css";
import Player from '../../gamelogic/Player';

function GamePage(props){
    const location = useLocation();
    const executedRef = React.useRef(false);

    // Modelo de la partida
    const gameModel = new GameModel(location.state.playerCards, location.state.enemyCards);

    // Estado de las cartas del jugador y del enemigo
    const [playerCards, setPlayerCards] = useState(gameModel.getPlayerCards());
    const [enemyCards, setEnemyCards] = useState(gameModel.getEnemyCards());
    const [playerCardsVersion, setPlayerCardsVersion] = useState(0);
    const [enemyCardsVersion, setEnemyCardsVersion] = useState(0);
    
    // New state for attack speed (2 seconds by default, 1 second when in fast mode)
    const [fastMode, setFastMode] = useState(false);
    const attackDelay = fastMode ? 1000 : 2000;

    // Estado visible de la partida
    const [gameState, setGameState] = useState({
        startingTurn: gameModel.getCurrentTurn(),
        currentTurn: gameModel.getCurrentTurn(),
        playerPoints: 3 - gameModel.getEnemyCards().length,
        enemyPoints: 3 - gameModel.getPlayerCards().length,
        turn: gameModel.getTurn(),
    });

    const [enemyCardRef, setEnemyCardRef] = useState(null);

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
        const updatedPlayerCards = [...playerCards]; // Copia las cartas locales
        const activeCard = updatedPlayerCards[0]; // La carta activa es la primera
    
        if (activeCard.isDefending) {
            // Reduce el daño en función del valor de defensa acumulado
            const reducedDamage = Math.max(0, damage - activeCard.defense);
            activeCard.setHealth(activeCard.getHealth() - reducedDamage);
            console.log(`Daño reducido: ${damage} -> ${reducedDamage}`);
        } else {
            // Aplica el daño completo si no está defendiendo
            activeCard.setHealth(activeCard.getHealth() - damage);
        }
    
        // Reinicia la defensa después de recibir daño
        activeCard.resetDefense();
    
        // Si la salud de la carta llega a 0 o menos, elimínala
        if (activeCard.getHealth() <= 0) {
            audio.play();
            updatedPlayerCards.shift(); // Elimina la carta activa
        }
    
        // Actualiza las cartas locales y notifica al padre
        setPlayerCards(updatedPlayerCards);
    };

    const handleEnemyDamage = (damage) => {
        const updatedEnemyCards = [...enemyCards];
        updatedEnemyCards[0].setHealth(updatedEnemyCards[0].getHealth() - damage);
        
        // Registrar el daño para los logros
        const player = new Player();
        player.recordDamage(damage);
        
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

    // Toggle function for the fast mode button
    const toggleFastMode = () => {
        setFastMode(!fastMode);
    };

    useEffect(() => {
        if (gameState.currentTurn === 1) {
            const timer = setTimeout(() => {
                // Anima la carta enemiga primero
                if (enemyCardRef && enemyCards.length > 0) {
                    enemyCardRef.animateAttack();

                    // Después aplica el daño
                    setTimeout(() => {
                        // El enemigo ataca siempre con el delay configurado
                        handlePlayerDamage(enemyCards[0].getAttackDamage());
                        // Usar una función en setGameState para asegurar el estado actual
                        setGameState({
                            ...gameState,
                            currentTurn: 0,
                            turn: gameState.startingTurn === 0 ? gameState.turn + 1 : gameState.turn,
                        });
                    }, 500);
                }
            }, attackDelay); // Use the configurable delay

            return () => clearTimeout(timer);
        }
    }, [gameState.currentTurn, enemyCardRef, attackDelay]); // Add attackDelay as dependency

    // Al iniciar una partida
    useEffect(() => {
        if (executedRef.current) return; // Evitar múltiples ejecuciones
        executedRef.current = true;
        const player = new Player();
        player.resetCurrentGameDamage();
        player.updateAchievementProgress('play1', 100);
        player.updateAchievementProgress('play5', 20); 
    }, []);

    return (
        <div className="game-page">
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
                attackDelay={attackDelay}
                fastMode={fastMode}
                toggleFastMode={toggleFastMode}
            />
        </div>
    );
}

export default GamePage;