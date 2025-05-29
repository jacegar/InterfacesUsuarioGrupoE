import "../styles/common/CardMini.css";
import Card from "./Card";

function CardMini(props) {
    const { cardModel, onCardClick, isHighlighted, volume } = props;

    return (
        <div className="card-mini-container">
            <Card cardModel={cardModel} onCardClick={onCardClick} isHighlighted={isHighlighted} volume = {volume}/>
        </div>
    );
}

export default CardMini;