class CardModel{
    constructor(id, name, health, imageUrl, attackName, attackDamage, passiveName, passiveQuantity, passiveType, description) {
        this.id = id; //id de la carta, lo usamos para leerla y guardarla desde un json
        this.name = name;
        this.health = health; //salud actual
        this.maxHealth = health; //salud maxima
        this.imageUrl = imageUrl;
        this.attackName = attackName;
        this.attackDamage = attackDamage;
        this.passiveName = passiveName;
        this.passiveQuantity = passiveQuantity; //cantidad de algo que hace la pasive (ej cura x de vida, hace menos de x de daño)
        this.passiveType = passiveType; //tipo de pasiva(ej cura, le hacen menos daño, etc)
        this.description = description; //descripcion de la carta en la parte de atras
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
}

export default CardModel;