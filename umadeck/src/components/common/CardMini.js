import "../styles/common/CardMini.css";
import Card from "./Card";

function CardMini(props) {
    const { cardModel, onCardClick, isHighlighted } = props;

    return (
        <div className="card-mini-container">
            <Card cardModel={cardModel} onCardClick={onCardClick} isHighlighted={isHighlighted}/>
        </div>
    );
}

export default CardMini;