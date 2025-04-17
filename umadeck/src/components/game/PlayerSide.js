import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/PlayerSide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";

function PlayerSide(props){
    const { cards, points } = props;

    return (
        <div className="player-side">
            <div className="player-cards">
                <CardMini cardModel={cards[1]} onCardClick={() => {}}/>
                <Card cardModel={cards[0]} onCardClick={() => {}}/>
                <CardMini cardModel={cards[2]} onCardClick={() => {}}/>
            </div>
            <PointsDisplay classname="points-container"points={points} side={0}/>
            <ProfileDisplay side={0}/>
        </div>
    );
}

export default PlayerSide;