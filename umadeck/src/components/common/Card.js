import "../styles/Card.css";

function Card(props) {
    const { cardModel, isSelected, onCardClick } = props;

    return (
        <div className={"custom-card" + (isSelected ? " selected" : "")} onClick={onCardClick}>
            <div className="custom-card-header">
                <h2 className="custom-card-name">{cardModel.getName()}</h2>
                <p className="custom-card-health">Vida: {cardModel.getHealth()}</p>
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
                    <p className="passive-name"><strong>Pasiva:</strong> {cardModel.getPassiveName()}</p>
                    <p className="passive-details">
                        Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                    </p>
                </div>
            </div>
            <div className="custom-card-footer">
                <img src="/assets/images/curved-arrow.svg" alt="Da la vuelta a la carta" />
            </div>
        </div>
    );
}

export default Card;