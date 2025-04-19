import cards from "../cards.json";

class CardModel {
    constructor(id) {
        this.id = id; // id of the card
        const jsonData = cards.find((card) => card.id === id); // Find the card by id
        if (!jsonData) {
            throw new Error(`Card data for id ${id} not found.`);
        }
        this.fromJson(JSON.stringify(jsonData))
        this.abilityUsed = false;
        this.defense = 0;
        this.isDefending = false;
        if(this.passiveType=="Defensa") {
            this.defense = this.passiveQuantity;
        }
    }

    fromJson(jsonString) {
        const data = JSON.parse(jsonString);
        this.id = data.id;
        this.name = data.name;
        this.health = data.health;
        this.maxHealth = data.health; //salud maxima
        this.imageUrl = data.imageUrl;
        this.attackName = data.attackName;
        this.attackDamage = data.attackDamage;
        this.passiveName = data.passiveName;
        this.passiveQuantity = data.passiveQuantity;
        this.passiveType = data.passiveType;
        this.description = data.description;
    }

    //Metodos de partida (aqui deberian implementarse metodos para ejecutar las pasivas, los ataques, etc en una partida)

    useAbility(targetCard) {
        if(this.abilityUsed) {
            throw new Error("La habilidad ya ha sido utilizada.");
        }
        switch (this.passiveType) {
            case "Cura":
                this.health += this.passiveQuantity;
                break;
            case "Defensa":
                this.isDefending = true;
                break;
            case "Fuerza":
                if(targetCard) {
                    targetCard.setHealth(targetCard.getHealth() - this.passiveQuantity);
                } else {
                    throw new Error(targetCard + "Se requiere una carta objetivo para usar la habilidad de ataque.");
                }
                break;
            case "Nada":
                break;
        }
        this.abilityUsed = true; // Marca la habilidad como utilizada
    }

    resetDefense() {
        this.isDefending = false; // Resetea la defensa al final del turno
        this.defense = 0;
    }

    // Getters and Setters
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    setHealth(health) {
        this.health = health;
    }

    getName() {
        return this.name;
    }
    
    getHealth() {
        return this.health;
    }
    getDefense() {
        return this.defense;
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