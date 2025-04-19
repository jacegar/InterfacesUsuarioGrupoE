import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import GameModel from '../../gamelogic/GameModel';
import EnemySide from './EnemySide';
import PlayerSide from './PlayerSide';
import "../styles/GamePage.css";

function GamePage(props){    
    const location = useLocation();

    //Modelo de la partida
    const gameModel = new GameModel(location.state.playerCards, location.state.enemyCards);

    //Estado de las cartas del jugador y del enemigo
    const [playerCards, setPlayerCards] = useState(gameModel.getPlayerCards());
    const [enemyCards, setEnemyCards] = useState(gameModel.getEnemyCards());
    const [playerCardsVersion, setPlayerCardsVersion] = useState(0);
    const [enemyCardsVersion, setEnemyCardsVersion] = useState(0);

    //Estado visible de la partida
    const [gameState, setGameState] = useState({
        startingTurn: gameModel.getCurrentTurn(),
        currentTurn: gameModel.getCurrentTurn(),
        playerPoints: (3 - gameModel.getEnemyCards().length),
        enemyPoints: (3 - gameModel.getPlayerCards().length),
        turn: gameModel.getTurn(),
    })

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
    }

    const handlePlayerCardsChange = (updatedCards) => {
        setPlayerCards(updatedCards);
    }

    const audio = new Audio("/assets/sounds/sound4.mp3");
    audio.volume = 0.4;
    const handlePlayerDamage = (damage) => {
        const updatedPlayerCards = [...playerCards];
        updatedPlayerCards[0].setHealth(updatedPlayerCards[0].getHealth() - damage);
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
        // Si es el turno del enemigo (turno 1)
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
        <EnemySide 
            cards={enemyCards} 
            points={3 - playerCards.length} 
            attachCardRef={setEnemyCardRef} 
            version={enemyCardsVersion} // Nueva prop
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
            version={playerCardsVersion} // Nueva prop
        />
    </div>
    );
}

export default GamePage;