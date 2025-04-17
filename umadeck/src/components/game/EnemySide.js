import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/EnemySide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";

function EnemySide(props){
    const { cards, points } = props;

    return (
        <div className="enemy-side">
            <div className="enemy-cards">
                <CardMini cardModel={cards[1]} onCardClick={() => {}}/>
                <Card cardModel={cards[0]} onCardClick={() => {}}/>
                <CardMini cardModel={cards[2]} onCardClick={() => {}}/>
            </div>
            <PointsDisplay points={points} side={1}/>
            <ProfileDisplay side={1}/>
        </div>
    );
}

export default EnemySide;