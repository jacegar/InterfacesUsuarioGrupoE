class Player {
    constructor() {
        const savedData = JSON.parse(localStorage.getItem('playerData')) || {};
        this.unlockedCards = savedData.unlockedCards || [];
    }

    getUnlockedCards() {
        return this.unlockedCards;
    }

    unlockCard(cardId) {
        if (!this.unlockedCards.includes(cardId)) {
            this.unlockedCards.push(cardId);
            this.save();
        }
    }

    save() {
        const data = {
            unlockedCards: this.unlockedCards
        };
        localStorage.setItem('playerData', JSON.stringify(data));
    }
}

export default Player;