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

    useEffect(() => {
        // Si es el turno del enemigo (turno 1)
        if (gameState.currentTurn === 1) {
            const timer = setTimeout(() => {
                // Usar una función en setGameState para asegurar el estado actual
                setGameState({
                    ...gameState,
                    currentTurn: 0,
                    turn: gameState.startingTurn === 0 ? gameState.turn + 1 : gameState.turn,
                });
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [gameState.currentTurn]);

    return (
        <div className="game-page">
            <EnemySide cards={enemyCards} points={3-playerCards.length}/>
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
            />
        </div>
    )
}

export default GamePage;