import cards from "../cards.json";

class CardModel {
    constructor(id) {
        this.id = id; // id of the card
        const jsonData = cards.find((card) => card.id === id); // Find the card by id
        if (!jsonData) {
            this.showStyledAlert(`Card data for id ${id} not found.`);
            return;
        }
        this.fromJson(JSON.stringify(jsonData));
        this.abilityUsed = false;
        this.defense = 0;
        this.isDefending = false;
        if (this.passiveType == "Defensa") {
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
        if (this.abilityUsed) {
            this.showStyledAlert("La habilidad ya ha sido utilizada");
            return;
        }
        switch (this.passiveType) {
            case "Cura":
                if (this.health + this.passiveQuantity > this.maxHealth) {
                    this.showStyledAlert("No se puede curar teniendo toda la vida");
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
                    this.showStyledAlert(targetCard + "Se requiere una carta objetivo para usar la habilidad de ataque.");
                }
                break;
            case "Nada":
                break;
        }
        this.abilityUsed = true; // Marca la habilidad como utilizada
    }

    showStyledAlert(message) {
        const alertDiv = document.createElement("div");
        alertDiv.textContent = message;
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.left = "50%";
        alertDiv.style.transform = "translateX(-50%)";
        alertDiv.style.backgroundColor = "#f8d7da";
        alertDiv.style.color = "#721c24";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.border = "1px solid #f5c6cb";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        alertDiv.style.zIndex = "1000";
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000); // Remove the alert after 3 seconds
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

    // Devuelve las cartas en el orden recomendado
    static getRecommendedCards() {
        const recommendationOrder = [2, 5, 4, 1, 3];
        return recommendationOrder.map(id => cards.find(card => card.id === id));
    }
}

export default CardModel;