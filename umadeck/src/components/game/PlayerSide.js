import CardMini from "../common/CardMini";
import Card from "../common/Card";
import "../styles/game/PlayerSide.css";
import PointsDisplay from "./PointsDisplay";
import ProfileDisplay from "./ProfileDisplay";
import {useState, useEffect, useCallback} from 'react';
import CardMenu from "./CardMenu";
import {useNavigate} from 'react-router-dom';
import ConfirmationMenu from "../common/ConfirmationMenu";
import MusicControl from "./MusicControl";
import HelpMenu from "../common/HelpMenu";
import Player from "../../gamelogic/Player";

function PlayerSide(props){
    const { cards, points, onEndTurn, currentTurn, onEnemyDamage, enemyCards, setEnemyCards, attackDelay, fastMode, toggleFastMode } = props;
    const [abilityEffect, setAbilityEffect] = useState(null);
    const [localCards, setLocalCards] = useState(cards);
    const [isCardSelected, setIsCardSelected] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cardRef, setCardRef] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [exchangeMode, setExchangeMode] = useState(false);
    const [canAttack, setCanAttack] = useState(true);
    const player = new Player();
    const [tutorialSeen, setTutorialSeen] = useState(player.hasSeenTutorial);
    const navigate = useNavigate();
    const [lastInteractionTime, setLastInteractionTime] = useState(0);
    
    const handleAttack = useCallback(() => {
        if (!canAttack) {
            console.warn("Ya has atacado en este turno.");
            return;
        }
        console.log("Atacar con carta");
        if (cards.length === 0) {
            console.warn("No hay cartas disponibles para atacar.");
            return;
        }
        if (cardRef) {
            cardRef.animateAttack();
            setCanAttack(false);

            setTimeout(() => {
                onEnemyDamage(cards[0].getAttackDamage());
                onEndTurn();
                setShowMenu(false);
                setIsCardSelected(false);
            }, 500);
        }
    }, [canAttack, cards, cardRef, onEnemyDamage, onEndTurn]);
    
    useEffect(() => {
        if (points >= 3) {
            navigate('/game-over-won');
        }
    }, [points, navigate]);

    useEffect(() => {
        if (isAutoMode && currentTurn === 0) {
            const autoAttackTimer = setTimeout(() => {
                handleAttack();
            }, attackDelay || 2000);
            
            return () => clearTimeout(autoAttackTimer);
        }
    }, [isAutoMode, currentTurn, attackDelay, handleAttack]);

    useEffect(() => {
        if (currentTurn === 0) {
            setCanAttack(true);
        }
    }, [currentTurn]);

    const handleCardInteraction = (e) => {
        if (e) e.preventDefault();
        
        const now = Date.now();
        if (now - lastInteractionTime < 300) {
            console.log("Interaction too soon, ignoring", now - lastInteractionTime);
            return;
        }
        setLastInteractionTime(now);
        
        if (currentTurn !== 0) {
            console.log("Not player's turn");
            return;
        }

        if (isCardSelected) {
            setIsCardSelected(false);
            setShowMenu(false);
        } else if (exchangeMode) {
            setIsCardSelected(false);
            setShowMenu(false);
            setExchangeMode(false);
        } else {
            setIsCardSelected(true);
            setShowMenu(true);
        }
    };

    const handleAbility = () => {
        try {
            const activeCard = localCards[0];
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
    
                    if (activeCard.passiveType === "Defensa") {
                        if (!activeCard.isDefending) {
                            activeCard.defense = activeCard.passiveQuantity;
                            activeCard.isDefending = true;
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
                    sound = new Audio(`/assets/sounds/sound1.mp3`);
                } else {
                    sound = new Audio(`/assets/sounds/${activeCard.passiveName}.mp3`);
                }
    
                sound.addEventListener("loadedmetadata", () => {
                    const soundlength = sound.duration * 1000;
    
                    sound.play().catch((error) => {
                        console.error("Error al reproducir el sonido:", error);
                    });
    
                    setTimeout(() => {
                        setAbilityEffect(null);
                    }, soundlength);
                });
            }
    
            activeCard.useAbility(targetEnemyCard);

            if (targetEnemyCard.getHealth() <= 0) {
                const updatedEnemyCards = [...enemyCards];
                updatedEnemyCards.shift();
                setEnemyCards(updatedEnemyCards);
            } else {
                const updatedEnemyCards = [...enemyCards];
                setEnemyCards(updatedEnemyCards);
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
        
        const activeCardDefending = updatedCards[0].isDefending;
        const activeCardDefenseValue = updatedCards[0].defense;
        
        [updatedCards[0], updatedCards[index]] = [updatedCards[index], updatedCards[0]];
        
        if (activeCardDefending) {
            updatedCards[0].isDefending = true;
            updatedCards[0].defense = activeCardDefenseValue;
            updatedCards[index].resetDefense();
        }
        
        setLocalCards(updatedCards);
        props.onPlayerCardsChange(updatedCards);
        
        setExchangeMode(false);
    };

    const handleGiveUp = () => {
        setShowConfirmation(true);
    };

    const confirmGiveUp = () => {
        navigate('/game-over-lost');
    };

    const cancelGiveUp = () => {
        setShowConfirmation(false);
    };

    const toggleAutoMode = () => {
        setIsAutoMode(!isAutoMode);
    };

    useEffect(() => {
        setLocalCards(cards);
    }, [cards]);
    
    return (
        <> 
            <div className="player-display">
                <ProfileDisplay side={0}/>
                <HelpMenu
                    className="help-menu"
                    title={<span className="help-menu-title">Ayuda del Juego</span>}
                    text={
                        <div className="help-menu-text">
                            {tutorialSeen &&
                             <>
                                <p><strong>Botones disponibles:</strong></p><ul>
                                    <li> <strong>Lupa:</strong> Pone en grande la carta. Tambien se pone en grande al mantener encima de la carta.</li>
                                    <li> <strong>Flecha semicircular:</strong> Da la vuelta a la carta.</li>
                                    <li> <strong>Auto:</strong> Activa el modo automático para que el juego ataque automáticamente.</li>
                                    <li> <strong>Terminar turno:</strong> Finaliza tu turno sin atacar.</li>
                                    <li> <strong>Rendirse:</strong> Abandona la partida actual.</li>
                                    <li> <strong>Altavoz:</strong> Activa, desactiva o ajusta el volumen de la música del juego.</li>
                                    <li> <strong>1x-2x:</strong> Ajusta la velocidad de ataque del enemigo y del modo automático.</li>
                                </ul>
                             </>
                            }
                            <p><strong>Funcionamiento básico:</strong></p>
                            <ul>
                                <li>Pincha en una carta para atacar, usar habilidades o cambiarla.</li>
                                <li>Derrota las 3 cartas del enemigo para ganar.</li>
                            </ul>
                        </div>
                    }
                    hasSeenTutorial={tutorialSeen}
                    onTutorialSeen={() => setTutorialSeen(true)}
                />
                <MusicControl/>
            </div>

            <div className="player-cards">
                <div 
                    className="card-slot left"
                    tabIndex={localCards[1] && exchangeMode ? "0" : undefined}
                    onKeyDown={(e) => {
                        if (exchangeMode && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            handleDirectExchange(1);
                        }
                    }}
                    aria-label={localCards[1] && exchangeMode? `Carta de ${localCards[1].name} a la izquierda de la principal del jugador`: ""}
                    role={localCards[1] && exchangeMode ? "button" : ""}
                >
                    {localCards[1] ? 
                        <CardMini 
                            cardModel={localCards[1]} 
                            onCardClick={() => exchangeMode ? handleDirectExchange(1) : {}}
                            isHighlighted={exchangeMode}
                        /> : 
                        <div className="card-placeholder"></div>
                    }
                </div>

                <div 
                    className="main-card-container" 
                    tabIndex="0"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCardInteraction();
                        }
                    }}
                    aria-label={`${localCards[0] ? `Carta principal del jugador: ${localCards[0].name}` : "Carta principal del jugador no disponible"}`}
                    role="button"
                >
                    {localCards[0] ? (
                        <Card 
                            cardModel={localCards[0]} 
                            isSelected={isCardSelected}
                            onCardClick={handleCardInteraction}
                            attachRef={setCardRef}
                        />
                    ) : (
                        <div className="card-placeholder main"></div>
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
                
                <div 
                    className="card-slot right"
                    tabIndex={localCards[2] && exchangeMode ? "0" : undefined}
                    onKeyDown={(e) => {
                        if (exchangeMode && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            handleDirectExchange(2);
                        }
                    }}
                    aria-label={localCards[2] && exchangeMode? `Carta de ${localCards[2].name} a la derecha de la principal del jugador`: ""}
                    role={localCards[2] && exchangeMode ? "button" : ""}
                >
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

                <div className="action-menu">
                    <button className="action-button auto"
                        onClick={toggleAutoMode}>
                        {isAutoMode ? "Desactivar Auto" : "Auto"}
                    </button>
                    <button 
                        className={`speed-button ${fastMode ? 'active' : ''}`}
                        onClick={toggleFastMode}
                        title={fastMode ? "Velocidad normal" : "Velocidad x2"}
                    >
                        {fastMode ? "2x" : "1x"}
                    </button>
                    <button className="action-button end-turn" 
                        onClick={() => {
                            setShowMenu(false);
                            setIsCardSelected(false);
                            onEndTurn();
                        }}
                        disabled={currentTurn !== 0}>
                        Terminar turno
                    </button>
                    <button
                        className="action-link give-up"
                        onClick={handleGiveUp}
                    >
                        Rendirse
                    </button>
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
        </>
    );
}

export default PlayerSide;