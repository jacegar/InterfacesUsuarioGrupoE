import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/EnemySide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";

function EnemySide(props){
    const { cards, points, attachCardRef } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (points >= 3) {
            navigate('/game-over-lost'); // Redirige a la pantalla de derrota
        }
    }, [points, navigate]);

    return (

        <div className="enemy-side">
            
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
            
            <PointsDisplay points={points} side={1}/>
            <ProfileDisplay side={1}/>
        </div>

    );
}

export default EnemySide;