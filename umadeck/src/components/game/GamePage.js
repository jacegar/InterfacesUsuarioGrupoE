import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import Card from '../common/Card';
import {useState} from 'react';
import GameModel from '../../gamelogic/GameModel';
import CardModel from '../../gamelogic/CardModel';
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

    const handleEnemyDamage = (damage) => {
        // Crea una copia y actualiza el estado correctamente
        const updatedEnemyCards = [...enemyCards];
        updatedEnemyCards[0].setHealth(updatedEnemyCards[0].getHealth() - damage);
        if (updatedEnemyCards[0].getHealth() <= 0) {
            updatedEnemyCards.shift(); // Elimina la carta si su salud es 0 o menos
        }
        setEnemyCards(updatedEnemyCards);
    };

    const handlePlayerDamage = (damage) => {
        // Crea una copia y actualiza el estado correctamente
        const updatedPlayerCards = [...playerCards];
        updatedPlayerCards[0].setHealth(updatedPlayerCards[0].getHealth() - damage);
        if (updatedPlayerCards[0].getHealth() <= 0) {
            updatedPlayerCards.shift(); // Elimina la carta si su salud es 0 o menos
        }
        setPlayerCards(updatedPlayerCards);
    }

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
            <EnemySide cards={enemyCards} points={3-playerCards.length} attachCardRef={setEnemyCardRef}/>
            <div className="turn-counter">
                Turno: {gameState.turn}
            </div>
            <hr/>
            <div className="turn-indicator">
                {gameState.currentTurn === 0 ? "Tu turno" : "Turno del rival"}
            </div>
            <PlayerSide cards={playerCards} 
                        points={3-enemyCards.length}
                        onEndTurn={useTurn} 
                        currentTurn={gameState.currentTurn}
                        onEnemyDamage={handleEnemyDamage}
            />
        </div>
    )
}

export default GamePage;