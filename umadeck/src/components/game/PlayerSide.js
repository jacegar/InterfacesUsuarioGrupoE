import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/PlayerSide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";
import {useState} from 'react';
import CardMenu from "./CardMenu";

function PlayerSide(props){
    const { cards, points, onEndTurn, currentTurn, onEnemyDamage } = props;
    const [isCardSelected, setIsCardSelected] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cardRef, setCardRef] = useState(null);

    const handleCardClick = () => {
        if (currentTurn !== 0) return; // Solo permite seleccionar cartas en tu turno
        
        if (isCardSelected) {
            // Si ya está seleccionada, muestra/oculta el menú
            setShowMenu(!showMenu);
        } else {
            // Selecciona la carta y muestra el menú
            setIsCardSelected(true);
            setShowMenu(true);
        }
    };

    const handleAttack = () => {
        console.log("Atacar con carta");
        // Primero anima la carta
        if (cardRef) {
            cardRef.animateAttack();

            // Después de un pequeño retraso, aplica el daño
            setTimeout(() => {
                // La carta enemiga activa recibe daño
                onEnemyDamage(cards[0].getAttackDamage());
                // Se termina el turno
                onEndTurn();
                // Se oculta el menú y se deselecciona la carta
                setShowMenu(false);
                setIsCardSelected(false);
            }, 500); // Espera a que la animación esté a medio camino
        }
    };

    const handleAbility = () => {
        console.log("Usar habilidad de carta");
        // Implementar lógica de habilidad
        setShowMenu(false);
        setIsCardSelected(false);
    };

    const handleChange = () => {
        console.log("Cambiar carta");
        // Implementar lógica de cambio
        setShowMenu(false);
        setIsCardSelected(false);
    };

    return (
        <div className="player-side">
    
            <div className="player-cards">
                {/* Esto habrá que cambiarlo para que el jugador pueda elegir 
                    la carta que quiere usar cuando le derrotan la activa */}
                
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
                            isSelected={isCardSelected}
                            onCardClick={handleCardClick}
                            attachRef={setCardRef}
                        /> : 
                        <div className="card-placeholder main"></div>
                    }
                    {isCardSelected && showMenu && (
                        <CardMenu
                            isActive={true}
                            onAttack={handleAttack}
                            onAbility={handleAbility}
                            onChange={handleChange}
                        />
                    )}
                </div>
                
                <div className="card-slot right">
                    {cards[2] ? 
                        <CardMini cardModel={cards[2]} onCardClick={() => {}}/> : 
                        <div className="card-placeholder"></div>
                    }
                </div>
                
            </div>
            
            
            <button className="end-turn-button" 
                onClick={onEndTurn} 
                disabled={currentTurn !== 0}>
                Terminar turno
            </button>
            <button className="give-up-button">
                Rendirse
            </button>
            <PointsDisplay classname="points-container" points={points}/>
            <ProfileDisplay side={0}/>
        </div>
    );
}

export default PlayerSide;