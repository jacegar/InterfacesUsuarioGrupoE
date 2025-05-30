import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/game/EnemySide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";

function EnemySide(props){
    const { cards, points, attachCardRef } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (points >= 3) {
            navigate('/game-over-lost');
        }
    }, [points, navigate]);

    return (

        <div className="enemy-side">
            <div className="enemy-display">
                <ProfileDisplay side={1}/>
            </div>
            <div className="enemy-cards">
                <div className="card-slot left">
                    {cards[1] ? 
                        <CardMini cardModel={cards[1]} onCardClick={() => {}}/> : 
                        <div className="card-placeholder"></div>
                    }
                </div>
                
                <div className="main-card-container">
                    {cards[0] ? 
                        <Card 
                            cardModel={cards[0]} 
                            onCardClick={() => {}}
                            attachRef={attachCardRef}
                        /> : 
                        <div className="card-placeholder main"></div>
                    }
                </div>
                
                <div className="card-slot right">
                    {cards[2] ? 
                        <CardMini cardModel={cards[2]} onCardClick={() => {}}/> : 
                        <div className="card-placeholder"></div>
                    }
                </div>
            </div>
            <div className="points-container">
                <PointsDisplay points={points}/>
            </div>
        </div>

    );
}

export default EnemySide;