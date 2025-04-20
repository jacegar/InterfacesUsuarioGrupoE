import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/PlayerSide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";
import {useState, useEffect} from 'react';
import CardMenu from "./CardMenu";
import {useNavigate} from 'react-router-dom';
import ConfirmationMenu from "../common/ConfirmationMenu";

function PlayerSide(props){
    const { cards, points, onEndTurn, currentTurn, onEnemyDamage, enemyCards, setEnemyCards} = props;
    const [abilityEffect, setAbilityEffect] = useState(null);
    const [localCards, setLocalCards] = useState(cards);
    const [isCardSelected, setIsCardSelected] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cardRef, setCardRef] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [defense, setDefense] = useState(0);
    const [isAutoMode, setIsAutoMode] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (points >= 3) {
            navigate('/game-over-won'); // Redirige a la pantalla de victoria
        }
    }, [points, navigate]);

    useEffect(() => {
        if (isAutoMode && currentTurn === 0) {
            handleAttack();
        }
    }, [isAutoMode, currentTurn]);

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
        if (cards.length === 0) {
            console.warn("No hay cartas disponibles para atacar.");
            return;
        }
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
        try {
            const activeCard = localCards[0]; // La carta activa es la primera en el array
            const targetEnemyCard = enemyCards[0];
    
            if (!activeCard.abilityUsed && !(activeCard.passiveType === "Cura" && activeCard.health === activeCard.maxHealth)) {
                if (activeCard.passiveType === "Cura" || activeCard.passiveType === "Defensa" || activeCard.passiveType === "Nada") {
                    if (activeCard.passiveName === "Hey, listen!") {
                        setAbilityEffect({ type: "heylisten", target: "player" });
                    } else if (activeCard.passiveName === "¡Jamón!") {
                        setAbilityEffect({ type: "jamon", target: "player" });
                    } else {
                        setAbilityEffect({ type: activeCard.passiveName, target: "player" });
                    }
    
                    // Manejo especial para la habilidad de defensa
                    if (activeCard.passiveType === "Defensa") {
                        const currentDefense = activeCard.defense || 0; // Obtén la defensa actual (si existe)
                        activeCard.defense = currentDefense + activeCard.passiveQuantity; // Acumula la defensa
                        activeCard.isDefending = true; // Marca la carta como defendiendo
                    }
                } else {
                    setAbilityEffect({ type: activeCard.passiveName, target: "enemy" });
                }
    
                let sound = null;
                if (activeCard.passiveName === "Hey, listen!") {
                    sound = new Audio(`/assets/sounds/${"heylisten"}.mp3`);
                } else if (activeCard.passiveName === "¡Jamón!") {
                    sound = new Audio(`/assets/sounds/${"jamon"}.mp3`);
                } else {
                    sound = new Audio(`/assets/sounds/${activeCard.passiveName}.mp3`);
                }
    
                // Espera a que el audio cargue completamente
                sound.addEventListener("loadedmetadata", () => {
                    const soundlength = sound.duration * 1000; // Duración del audio en milisegundos
    
                    // Reproduce el sonido
                    sound.play().catch((error) => {
                        console.error("Error al reproducir el sonido:", error);
                    });
    
                    // Oculta la imagen después de que termine el audio
                    setTimeout(() => {
                        setAbilityEffect(null);
                    }, soundlength);
                });
            }
    
            // Usa la habilidad
            activeCard.useAbility(targetEnemyCard);
    
            // Verifica si la carta enemiga debe ser eliminada
            if (targetEnemyCard.getHealth() <= 0) {
                const updatedEnemyCards = [...enemyCards];
                updatedEnemyCards.shift(); // Elimina la carta enemiga activa
                setEnemyCards(updatedEnemyCards); // Actualiza el estado
            }
    
            console.log("Habilidad usada:", activeCard.getPassiveName());
        } catch (error) {
            alert(error.message);
        }
        setShowMenu(false);
        setIsCardSelected(false);
    };

    const handleChange = () => {
        console.log("Cambiar carta");
        const def = localCards[0].isDefending; // Verifica si la carta activa está defendiendo
        const defValue = localCards[0].defense;
        if (localCards.length > 1) {
            const updatedCards = [...localCards];
            const [activeCard] = updatedCards.splice(0, 1); // Extrae la carta activa
            if(def) {
                updatedCards[0].isDefending = true;
                updatedCards[0].defense = defValue; // Asigna la defensa a la carta activa
                activeCard.resetDefense();
            }
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

    const toggleAutoMode = () => {
        setIsAutoMode(!isAutoMode);
    };

    useEffect(() => {
        setLocalCards(cards); // Sincroniza localCards con las cartas del padre
    }, [cards]);
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
                {localCards[0] ? (
                    <Card 
                        cardModel={localCards[0]} 
                        isSelected={isCardSelected}
                        onCardClick={handleCardClick}
                        attachRef={setCardRef}
                    />
                ) : (
                    <div className="card-placeholder main"></div> // Muestra un marcador si no hay carta
                )}
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
            {abilityEffect && (
            <div
                className={`ability-effect ${
                    abilityEffect.target === "player" ? "player-effect" : "enemy-effect"
                }`}
            >
                <img
                    src={`/assets/images/${abilityEffect.type}.png`}
                    alt={abilityEffect.type}
                />
            </div>
        )}
            
            <button className="end-turn-button" 
                onClick={onEndTurn} 
                disabled={currentTurn !== 0}>
                Terminar turno
            </button>
            <button className="give-up-button"
                onClick={handleGiveUp}>
                Rendirse
            </button>
            <button className="auto-button"
                onClick={toggleAutoMode}>
                {isAutoMode ? "Desactivar Auto" : "Auto"}
            </button>
            {showConfirmation && (
                <ConfirmationMenu onConfirm={confirmGiveUp} onCancel={cancelGiveUp} text={"¿Estás seguro de que quieres rendirte?"}/>
            )}
            <PointsDisplay classname="points-container" points={points}/>
            <ProfileDisplay side={0}/>
        </div>
    );
}

export default PlayerSide;