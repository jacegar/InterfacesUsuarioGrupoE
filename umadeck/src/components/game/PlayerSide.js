import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/PlayerSide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";
import {useState, useEffect} from 'react';
import CardMenu from "./CardMenu";
import {useNavigate} from 'react-router-dom';
import ConfirmationMenu from "../common/ConfirmationMenu";
import MusicControl from "./MusicControl";
import HelpMenu from "../common/HelpMenu";

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
    const [exchangeMode, setExchangeMode] = useState(false); // Nuevo estado para el modo de intercambio
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
            // Si ya está seleccionada, muestra/oculta el menú y deselecciona la carta
            setIsCardSelected(false);
            setShowMenu(!showMenu);
        } else if (exchangeMode) { // Cancelar cambiar carta seleccionando la activa
            setIsCardSelected(false);
            setShowMenu(false);
            setExchangeMode(false);
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
                        if (!activeCard.isDefending) {
                            // Solo aplica la defensa si no está activa
                            activeCard.defense = activeCard.passiveQuantity; // Establece la defensa
                            activeCard.isDefending = true; // Marca la carta como defendiendo
                        } else {
                            console.warn("La defensa ya está activa y no se acumula.");
                        }
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
    
           
        if (!activeCard.abilityUsed) {
            activeCard.useAbility(targetEnemyCard);

            // Verifica si la carta enemiga debe ser eliminada
            if (targetEnemyCard.getHealth() <= 0) {
                const updatedEnemyCards = [...enemyCards];
                updatedEnemyCards.shift(); // Elimina la carta enemiga activa
                setEnemyCards(updatedEnemyCards); // Actualiza el estado
            } else {
                // Si la carta enemiga no es eliminada, actualiza su estado
                const updatedEnemyCards = [...enemyCards];
                setEnemyCards(updatedEnemyCards); // Actualiza el estado
            }
        }
    
            console.log("Habilidad usada:", activeCard.getPassiveName());
        } catch (error) {
            alert(error.message);
        }
        setShowMenu(false);
        setIsCardSelected(false);
    };

    const handleChange = () => {
        console.log("Activando modo de intercambio");
        if (localCards.length > 1) {
            setExchangeMode(true);
            setShowMenu(false);
            setIsCardSelected(false);
        }
    };

    const handleDirectExchange = (index) => {
        if (!exchangeMode) return;
        
        console.log(`Intercambiando carta activa con carta en posición ${index}`);
        const updatedCards = [...localCards];
        
        // Guarda el estado de defensa antes del intercambio
        const activeCardDefending = updatedCards[0].isDefending;
        const activeCardDefenseValue = updatedCards[0].defense;
        
        // Intercambia las cartas
        [updatedCards[0], updatedCards[index]] = [updatedCards[index], updatedCards[0]];
        
        // Transfiere el estado de defensa si es necesario
        if (activeCardDefending) {
            updatedCards[0].isDefending = true;
            updatedCards[0].defense = activeCardDefenseValue;
            updatedCards[index].resetDefense();
        }
        
        // Actualiza el estado
        setLocalCards(updatedCards);
        props.onPlayerCardsChange(updatedCards);
        
        // Desactiva el modo de intercambio
        setExchangeMode(false);
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
            <div className="action-menu">
                <button className="action-button"
                    onClick={toggleAutoMode}>
                    {isAutoMode ? "Desactivar Auto" : "Auto"}
                </button>
                <button className="action-button" 
                    onClick={onEndTurn} 
                    disabled={currentTurn !== 0}>
                    Terminar turno
                </button>
                <button className="action-button give-up"
                    onClick={handleGiveUp}>
                    Rendirse
                </button>
            </div>
            <div className="player-display">
                <ProfileDisplay side={0}/>
                <HelpMenu
                    className="help-menu"
                    title={<span className="help-menu-title">Ayuda del Juego</span>}
                    text={
                        <div className="help-menu-text">
                            <p><strong>Botones disponibles:</strong></p>
                            <ul>
                                <li> <strong>Auto:</strong> Activa el modo automático para que el juego ataque automáticamente.</li>
                                <li> <strong>Terminar turno:</strong> Finaliza tu turno sin atacar.</li>
                                <li> <strong>Rendirse:</strong> Abandona la partida actual.</li>
                                <li> <strong>Altavoz:</strong> Activa, desactiva o ajusta el volumen de la música del juego.</li>
                            </ul>
                            <p><strong>Funcionamiento básico:</strong></p>
                            <ul>
                                <li>Pincha en una carta para atacar, usar habilidades o cambiarla.</li>
                                <li>Derrota las 3 cartas del enemigo para ganar.</li>
                            </ul>
                        </div>
                    }
                />
                <MusicControl/>
            </div>
            <div className="player-cards">
                <div className="card-slot left">
                {localCards[1] ? 
                    <CardMini 
                        cardModel={localCards[1]} 
                        onCardClick={() => exchangeMode ? handleDirectExchange(1) : {}}
                        isHighlighted={exchangeMode}
                    /> : 
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
                {isCardSelected && showMenu && !exchangeMode && (
                    <CardMenu
                        isActive={true}
                        onAttack={handleAttack}
                        onAbility={handleAbility}
                        onChange={handleChange}
                    />
                )}
                {exchangeMode && (
                    <div className="exchange-mode-indicator">
                        Selecciona una carta para intercambiar
                    </div>
                )}
                </div>
            <div className="card-slot right">
                {localCards[2] ? 
                    <CardMini 
                        cardModel={localCards[2]} 
                        onCardClick={() => exchangeMode ? handleDirectExchange(2) : {}}
                        isHighlighted={exchangeMode}
                    /> : 
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
            {showConfirmation && (
                <ConfirmationMenu onConfirm={confirmGiveUp} onCancel={cancelGiveUp} text={"¿Estás seguro de que quieres rendirte?"}/>
            )}

            <div className="points-container">
                <PointsDisplay points={points}/>
            </div>
        </div>
    );
}

export default PlayerSide;