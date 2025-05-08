import "../styles/common/CardFront.css";

function CardFront(props){
    const { cardModel } = props;

    return (
        <div className="card-front">
            <div className="custom-card-header">
                <h2 className="custom-card-name">{cardModel.getName()}</h2>
                <div className="health-box">
                    <p className="custom-card-health">Vida: {cardModel.getHealth()}</p>
                    <div className="health-bar-border">
                        <div 
                            className={
                                "health-bar " +
                                (cardModel.getHealth() / cardModel.getMaxHealth() > 0.7
                                    ? "green"
                                    : cardModel.getHealth() / cardModel.getMaxHealth() > 0.3
                                    ? "yellow"
                                    : "red")
                            }
                            style={{
                                width: (cardModel.getHealth() / cardModel.getMaxHealth()) * 100 + "%"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="custom-card-image">
                <img src={cardModel.getImageUrl()} alt={`Imagen de ${cardModel.getName()}`} />
            </div>
            <div className="custom-card-body">
                <div className="attack">
                    <p className="attack-name"><strong>Ataque:</strong> {cardModel.getAttackName()}</p>
                    <p className="attack-details">Daño: <strong>{cardModel.getAttackDamage()}</strong></p>
                </div>
                <div className="passive">
                    <p className="passive-name"><strong>Habilidad:</strong> {cardModel.getPassiveName()}</p>
                    <p className="passive-details">
                        Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardFront;