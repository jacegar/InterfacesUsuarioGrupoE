import CardModel from "./CardModel.js";
import Player from "./Player.js";

class GameModel{
    constructor(playerCards, enemyCards) {
        this.playerCards = playerCards.map(card =>
            card instanceof CardModel ? card : new CardModel(card.id)
        );
        this.enemyCards = enemyCards.map(card =>
            card instanceof CardModel ? card : new CardModel(card.id)
        );

        this.currentPlayerCard = playerCards[0];
        this.currentEnemyCard = enemyCards[0];
        this.turn = 1;

        if(Math.random() < 0.5) {
            this.currentTurn = 0;
        }else{
            this.currentTurn = 1;
        }

        this.player = new Player();
        this.playerCards.forEach(card => {
            if (!this.player.getUnlockedCards().includes(card.getId())) {
                this.player.unlockCard(card.getId());
            }
        });
    }

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