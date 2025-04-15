import cards from "../cards.json";

class CardModel {
    constructor(id) {
        this.id = id; // id of the card
        const jsonData = cards.find((card) => card.id === id); // Find the card by id
        if (!jsonData) {
            throw new Error(`Card data for id ${id} not found.`);
        }
        this.fromJson(JSON.stringify(jsonData))
    }

    fromJson(jsonString) {
        const data = JSON.parse(jsonString);
        this.id = data.id;
        this.name = data.name;
        this.health = data.health;
        this.maxHealth = data.maxHealth; //salud maxima
        this.imageUrl = data.imageUrl;
        this.attackName = data.attackName;
        this.attackDamage = data.attackDamage;
        this.passiveName = data.passiveName;
        this.passiveQuantity = data.passiveQuantity;
        this.passiveType = data.passiveType;
        this.description = data.description;
    }

    //Metodos de partida (aqui deberian implementarse metodos para ejecutar las pasivas, los ataques, etc en una partida)

    // Getters and Setters
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    getHealth() {
        return this.health;
    }

    getMaxHealth() {
        return this.maxHealth;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getAttackName() {
        return this.attackName;
    }

    getAttackDamage() {
        return this.attackDamage;
    }

    getPassiveName() {
        return this.passiveName;
    }

    getPassiveQuantity() {
        return this.passiveQuantity;
    }

    getPassiveType() {
        return this.passiveType;
    }

    getDescription() {
        return this.description;
    }

    setHealth(health) {
        this.health = health;
    }

    static getAllCards() { 
        return cards.map(card => new CardModel(card.id));
    }
}

export default CardModel;