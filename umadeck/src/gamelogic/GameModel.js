import CardModel from "./CardModel.js";

class GameModel{
    constructor(playerCards, enemyCards) {
        // Nos aseguramos de que los arrays de cartas sean instancias de CardModel y no de Object
        this.playerCards = playerCards.map(card =>
            card instanceof CardModel ? card : new CardModel(card.id)
        );
        this.enemyCards = enemyCards.map(card =>
            card instanceof CardModel ? card : new CardModel(card.id)
        );

        this.currentPlayerCard = playerCards[0]; // Current player card
        this.currentEnemyCard = enemyCards[0]; // Current enemy card
        this.turn = 1; //La partida empieza en el turno 1

        //Podemos usar currentTurn = 2 para una partida acabada
        if(Math.random() < 0.5) {
            this.currentTurn = 0; //turno del jugador
        }else{
            this.currentTurn = 1; //turno del enemigo
        }
    }

    //Getters
    getPlayerCards() {
        return this.playerCards;
    }

    getEnemyCards() {
        return this.enemyCards;
    }

    getCurrentPlayerCard() {
        return this.currentPlayerCard;
    }

    getCurrentEnemyCard() {
        return this.currentEnemyCard;
    }

    getCurrentTurn() {
        return this.currentTurn;
    }

    getTurn() {
        return this.turn;
    }

}

export default GameModel;