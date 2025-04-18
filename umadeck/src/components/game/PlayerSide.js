import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/PlayerSide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";
import {useState, useEffect} from 'react';
import CardMenu from "./CardMenu";
import {useNavigate} from 'react-router-dom';

function PlayerSide(props){
    const { cards, points, onEndTurn, currentTurn, onEnemyDamage } = props;
    const [localCards, setLocalCards] = useState(cards);
    const [isCardSelected, setIsCardSelected] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cardRef, setCardRef] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (points >= 3) {
            navigate('/game-over-won'); // Redirige a la pantalla de victoria
        }
    }, [points, navigate]);

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
        if (localCards.length > 1) {
            const updatedCards = [...localCards];
            const [activeCard] = updatedCards.splice(0, 1); // Extrae la carta activa
            updatedCards.push(activeCard); // Añade la carta activa al final del array
            setLocalCards(updatedCards); // Actualiza el estado con las cartas modificadas
            props.onPlayerCardsChange(updatedCards); // Notifica al padre sobre el cambio
        }
        setShowMenu(false);
        setIsCardSelected(false);
    };

    const handleGiveUp = () => {
        setShowConfirmation(true); // Muestra el cuadro de confirmación
    };

    const confirmGiveUp = () => {
        navigate('/game-over-lost'); // Redirige a la página de "Has perdido"
    };

    const cancelGiveUp = () => {
        setShowConfirmation(false); // Oculta el cuadro de confirmación
    };

    return (
        <div className="player-side">
    
            <div className="player-cards">
                {/* Esto habrá que cambiarlo para que el jugador pueda elegir 
                    la carta que quiere usar cuando le derrotan la activa */}
                
                <div className="card-slot left">
                {localCards[1] ? 
                    <CardMini cardModel={localCards[1]} onCardClick={() => {}}/> : 
                    <div className="card-placeholder"></div>
                }
                </div>

            <div className="main-card-container">
                {localCards[0] ? 
                    <Card 
                        cardModel={localCards[0]} 
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
                {localCards[2] ? 
                    <CardMini cardModel={localCards[2]} onCardClick={() => {}}/> : 
                    <div className="card-placeholder"></div>
                }
            </div>
                
            </div>
            
            
            <button className="end-turn-button" 
                onClick={onEndTurn} 
                disabled={currentTurn !== 0}>
                Terminar turno
            </button>
            <button className="give-up-button"
                onClick={handleGiveUp}>
                Rendirse
            </button>
            {showConfirmation && (
                <div className="confirmation-dialog">
                    <p>¿Estás seguro de que quieres rendirte?</p>
                    <button className="confirm-button" onClick={confirmGiveUp}>
                        Sí
                    </button>
                    <button className="cancel-button" onClick={cancelGiveUp}>
                        No
                    </button>
                </div>
            )}
            <PointsDisplay classname="points-container" points={points}/>
            <ProfileDisplay side={0}/>
        </div>
    );
}

export default PlayerSide;