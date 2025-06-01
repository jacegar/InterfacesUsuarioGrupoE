import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/game/EnemySide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";

function EnemySide(props){
    const { cards, points, attachCardRef, volume } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (points >= 3) {
            navigate('/game-over-lost', {state : {volume : volume}});
        }
    }, [points, navigate]);

    return (

        <>
            <div className="enemy-display">
                <ProfileDisplay side={1}/>
            </div>

            <div className="enemy-cards" role="region" aria-label="Cartas del enemigo">
                <div className="card-slot left" role={cards[1] ? "article" : ""} aria-label={cards[1] ? `Carta enemiga de ${cards[1].name}` : ""}>
                    {cards[1] ? 
                        <CardMini cardModel={cards[1]} onCardClick={() => {}} volume={volume}/> : 
                        <div className="card-placeholder"></div>
                    }
                </div>
                
                <div className="main-card-container" role="article" aria-label={`Carta principal enemiga de ${cards[0].name}`}>
                    {cards[0] ? 
                        <Card 
                            cardModel={cards[0]} 
                            onCardClick={() => {}}
                            attachRef={attachCardRef}
                            volume={volume}
                        /> : 
                        <div className="card-placeholder main"></div>
                    }
                </div>
                
                <div className="card-slot right" role={cards[2] ? "article" : ""} aria-label={cards[2] ? `Carta enemiga de ${cards[2].name}` : ""}>
                    {cards[2] ? 
                        <CardMini cardModel={cards[2]} onCardClick={() => {}} volume={volume}/> : 
                        <div className="card-placeholder"></div>
                    }
                </div>
            </div>

            <div className="points-container-enemy">
                <PointsDisplay points={points}/>
            </div>
        </>

    );
}

export default EnemySide;