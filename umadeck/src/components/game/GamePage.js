import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameModel from '../../gamelogic/GameModel';
import EnemySide from './EnemySide';
import PlayerSide from './PlayerSide';
import "../styles/game/GamePage.css";
import Player from '../../gamelogic/Player';

function GamePage(props){
    const location = useLocation();
    const executedRef = React.useRef(false);

    const gameModel = new GameModel(location.state.playerCards, location.state.enemyCards);

    const [playerCards, setPlayerCards] = useState(gameModel.getPlayerCards());
    const [enemyCards, setEnemyCards] = useState(gameModel.getEnemyCards());
    const [playerCardsVersion, setPlayerCardsVersion] = useState(0);
    const [enemyCardsVersion, setEnemyCardsVersion] = useState(0);
    
    const [fastMode, setFastMode] = useState(false);
    const attackDelay = fastMode ? 1000 : 2000;

    const [volume, setVolume] = useState(0);
    const audio = new Audio("/assets/sounds/sound4.mp3");
    audio.volume = volume > 0 ? 0.4 : 0;

    const [gameState, setGameState] = useState({
        startingTurn: gameModel.getCurrentTurn(),
        currentTurn: gameModel.getCurrentTurn(),
        playerPoints: 3 - gameModel.getEnemyCards().length,
        enemyPoints: 3 - gameModel.getPlayerCards().length,
        turn: gameModel.getTurn(),
    });

    const [enemyCardRef, setEnemyCardRef] = useState(null);

    const useTurn = () => {
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

    const handlePlayerDamage = (damage) => {
        const updatedPlayerCards = [...playerCards];
        const activeCard = updatedPlayerCards[0];
    
        if (activeCard.isDefending) {
            const reducedDamage = Math.max(0, damage - activeCard.defense);
            activeCard.setHealth(activeCard.getHealth() - reducedDamage);
            console.log(`Daño reducido: ${damage} -> ${reducedDamage}`);
        } else {
            activeCard.setHealth(activeCard.getHealth() - damage);
        }
    
        activeCard.resetDefense();
    
        if (activeCard.getHealth() <= 0) {
            if(volume > 0) {
                audio.play();
            }
            updatedPlayerCards.shift();
        }
    
        setPlayerCards(updatedPlayerCards);
    };

    const handleEnemyDamage = (damage) => {
        const updatedEnemyCards = [...enemyCards];
        updatedEnemyCards[0].setHealth(updatedEnemyCards[0].getHealth() - damage);
        
        const player = new Player();
        player.recordDamage(damage);
        
        if (updatedEnemyCards[0].getHealth() <= 0) {
            if(volume > 0) {
                audio.play();
            }
            updatedEnemyCards.shift();
        }
        setEnemyCards(updatedEnemyCards);
        setEnemyCardsVersion(enemyCardsVersion + 1);
        setGameState({
            ...gameState,
            playerPoints: 3 - updatedEnemyCards.length,
        });
    };

    const toggleFastMode = () => {
        setFastMode(!fastMode);
    };

    useEffect(() => {
        if (gameState.currentTurn === 1) {
            const timer = setTimeout(() => {
                if (enemyCardRef && enemyCards.length > 0) {
                    enemyCardRef.animateAttack();

                    setTimeout(() => {
                        handlePlayerDamage(enemyCards[0].getAttackDamage());
                        setGameState({
                            ...gameState,
                            currentTurn: 0,
                            turn: gameState.startingTurn === 0 ? gameState.turn + 1 : gameState.turn,
                        });
                    }, 500);
                }
            }, attackDelay);

            return () => clearTimeout(timer);
        }
    }, [gameState.currentTurn, enemyCardRef, attackDelay]);

    useEffect(() => {
        if (executedRef.current) return;
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
                volume={volume}
            />
            <div className="turn-section">
                <div className="turn-counter">
                    Turno: {gameState.turn}
                </div>
                <hr />
                <div className={`turn-indicator ${gameState.currentTurn === 0 ? "player-turn" : "enemy-turn"}`}>
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
                volume={volume}
                setVolume={setVolume}
            />
        </div>
    );
}

export default GamePage;