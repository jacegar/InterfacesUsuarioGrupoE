import cards from "../cards.json";
import { showStyledAlert } from "../components/common/StyledAlert";

class CardModel {
    constructor(id) {
        this.id = id;
        const jsonData = cards.find((card) => card.id === id);
        if (!jsonData) {
            showStyledAlert(`Card data for id ${id} not found.`);
            return;
        }
        this.fromJson(JSON.stringify(jsonData));
        this.abilityUsed = false;
        this.defense = 0;
        this.isDefending = false;
        if (this.passiveType === "Defensa") {
            this.defense = this.passiveQuantity;
        }
    }

    fromJson(jsonString) {
        const data = JSON.parse(jsonString);
        this.id = data.id;
        this.name = data.name;
        this.health = data.health;
        this.maxHealth = data.health;
        this.imageUrl = data.imageUrl;
        this.attackName = data.attackName;
        this.attackDamage = data.attackDamage;
        this.passiveName = data.passiveName;
        this.passiveQuantity = data.passiveQuantity;
        this.passiveType = data.passiveType;
        this.description = data.description;
    }

    useAbility(targetCard) {
        if (this.abilityUsed) {
            showStyledAlert("La habilidad ya ha sido utilizada");
            return;
        }
        switch (this.passiveType) {
            case "Cura":
                if (this.health + this.passiveQuantity > this.maxHealth) {
                    showStyledAlert("No se puede curar teniendo toda la vida");
                    return;
                } else {
                    this.health += this.passiveQuantity;
                }
                break;
            case "Defensa":
                this.isDefending = true;
                break;
            case "Fuerza":
                if (targetCard) {
                    targetCard.setHealth(targetCard.getHealth() - this.passiveQuantity);
                } else {
                    showStyledAlert(targetCard + "Se requiere una carta objetivo para usar la habilidad de ataque.");
                }
                break;
            case "Nada":
                break;
            default:
        }
        this.abilityUsed = true;
    }

    resetDefense() {
        this.isDefending = false;
        this.defense = 0;
    }

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

    static getAllCards() { 
        return cards.map(card => new CardModel(card.id));
    }

    static getRecommendedCards() {
        const recommendationOrder = [2, 5, 4, 1, 3];
        return recommendationOrder.map(id => cards.find(card => card.id === id));
    }
}

export default CardModel;