import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import Card from '../common/Card';
import {useState} from 'react';
import GameModel from '../../gamelogic/GameModel';
import CardModel from '../../gamelogic/CardModel';

function GamePage(props){
    const location = useLocation();

    //Modelo de la partida
    const gameModel = new GameModel(location.state.playerCards, location.state.enemyCards);

    //Estado de las cartas del jugador y del enemigo
    const [playerCards, setPlayerCards] = useState(gameModel.getPlayerCards());
    const [enemyCards, setEnemyCards] = useState(gameModel.getEnemyCards());
    
    //Estado visible de la partida
    const [gameState, setGameState] = useState({
        currentTurn: gameModel.getCurrentTurn(),
        playerPoints: (3 - gameModel.getEnemyCards().length),
        enemyPoints: (3 - gameModel.getPlayerCards().length),
    })

    return (
        <div className="game-page">
            <div className="enemy-cards">
                {enemyCards.map((card, index) => (
                    <Card key={index} cardModel={card} isSelected={false} onCardClick={() => {}}/>
                ))}
            </div>
            <div className="player-cards">
                {playerCards.map((card, index) => (
                    <Card key={index} cardModel={card} isSelected={false} onCardClick={() => {}}/>
                ))}
            </div>

        </div>
    )
}

export default GamePage;