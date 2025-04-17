import "../styles/CardMini.css";

function CardMini(props) {
    const { cardModel, onCardClick } = props;

    return (
        <div className="card-mini" onClick={onCardClick}>
            <div className="card-mini-header">
                <h2 className="card-mini-name">{cardModel.getName()}</h2>
                <p className="card-mini-health">Vida: {cardModel.getHealth()}</p>
            </div>
            <div className="card-mini-image">
                <img src={cardModel.getImageUrl()} alt={`Imagen de ${cardModel.getName()}`} />
            </div>
            <div className="card-mini-body">
                <div className="card-mini-attack">
                    <p className="card-mini-attack-name"><strong>Ataque:</strong> {cardModel.getAttackName()}</p>
                    <p className="card-mini-attack-details">Daño: <strong>{cardModel.getAttackDamage()}</strong></p>
                </div>
                <div className="card-mini-passive">
                    <p className="card-mini-passive-name"><strong>Pasiva:</strong> {cardModel.getPassiveName()}</p>
                    <p className="card-mini-passive-details">
                        Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                    </p>
                </div>
            </div>
            <div className="card-mini-footer">
                <img src="/assets/images/curved-arrow.svg" alt="Da la vuelta a la carta" />
            </div>
        </div>
    );
}

export default CardMini;