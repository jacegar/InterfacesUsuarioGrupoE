import "../styles/Card.css";
import { useState, useRef, useEffect } from "react";

function Card(props) {
    const { cardModel, isSelected, onCardClick, attachRef } = props;
    const [showEnlarged, setShowEnlarged] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const cardRef = useRef(null);
    const timerRef = useRef(null);
    
    const animateAttack = () => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 700); // Duración de la animación
        const audio = new Audio("/assets/sounds/sound1.mp3");
        audio.volume = 0.5;
        audio.play(); // Reproducir el sonido
    };

    // Clean up timer if component unmounts
    useEffect(() => {
        if (props.attachRef) {
            props.attachRef({
                animateAttack
            });
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);
    
    const handleMouseDown = () => {
        // Don't start timer if already showing enlarged
        if (showEnlarged) return;
        
        // Start a timer to show enlarged after 1 second
        timerRef.current = setTimeout(() => {
            setShowEnlarged(true);
            setShowOverlay(true);
        }, 1000);
    };
    
    const handleMouseUp = () => {
        // Clear the timer if mouse is released before 2 seconds
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            
            // If card wasn't enlarged, handle as a normal click
            if (!showEnlarged && onCardClick) {
                onCardClick();
            }
        }
    };
    
    const handleMouseLeave = () => {
        // Only clear the timer if mouse leaves before enlargement
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    
    // Handle overlay click to close the enlarged card
    const handleOverlayClick = () => {
        setShowEnlarged(false);
        setShowOverlay(false);
    };
    
    // Prevent clicks on the enlarged card from closing the overlay
    const handleEnlargedCardClick = (e) => {
        if (showEnlarged) {
            e.stopPropagation();
        }
    };

    const handleMagnifyClick = () => {
        setShowEnlarged(true);
        setShowOverlay(true);
    };

    const handleFlip = () => {
        setShowBack(!showBack);

    }

    return (
        <>
            {showOverlay && <div className="overlay active" onClick={handleOverlayClick}></div>}
            
            {/* Original card stays in place */}
            <div 
                className={`custom-card${isSelected ? " selected" : ""}${isAttacking ? " attacking" : ""}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                {!showBack ? (
                    <div className="card-front">
                        <div className="custom-card-header">
                            <h2 className="custom-card-name">{cardModel.getName()}</h2>
                            <div className="health-box">
                                <p className="custom-card-health">Vida: {cardModel.getHealth()}</p>
                                <div className="health-bar-border">
                                    <div 
                                        className={
                                            "health-bar " +
                                            (cardModel.getHealth() / cardModel.getMaxHealth() > 0.7
                                                ? "green"
                                                : cardModel.getHealth() / cardModel.getMaxHealth() > 0.3
                                                ? "yellow"
                                                : "red")
                                        }
                                        style={{
                                            width: (cardModel.getHealth() / cardModel.getMaxHealth()) * 100 + "%"
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-card-image">
                            <img src={cardModel.getImageUrl()} alt={`Imagen de ${cardModel.getName()}`} />
                        </div>
                        <div className="custom-card-body">
                            <div className="attack">
                                <p className="attack-name"><strong>Ataque:</strong> {cardModel.getAttackName()}</p>
                                <p className="attack-details">Daño: <strong>{cardModel.getAttackDamage()}</strong></p>
                            </div>
                            <div className="passive">
                                <p className="passive-name"><strong>Habilidad:</strong> {cardModel.getPassiveName()}</p>
                                <p className="passive-details">
                                    Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card-back">
                        <div className="custom-card-description">
                            <p>{cardModel.getDescription()}</p>
                        </div>
                    </div>
                )}
                <div className="custom-card-footer">
                    <img 
                        src="/assets/images/curved-arrow.svg" 
                        alt="Da la vuelta a la carta" 
                        className="flip-icon" 
                        onClick={handleFlip} 
                    />
                    <img 
                        className="magnify-icon" 
                        src="/assets/images/image7.png" 
                        alt="Ampliar carta" 
                        onClick={handleMagnifyClick} 
                    />
                </div>
            </div>
            
            {/* Enlarged clone that appears in the center */}
            {showEnlarged && (
                <div className="card-enlarged-clone" onClick={handleEnlargedCardClick}>
                    {!showBack ? (
                        <div className="card-front">
                            <div className="custom-card-header">
                                <h2 className="custom-card-name">{cardModel.getName()}</h2>
                                <div className="health-box">
                                    <p className="custom-card-health">Vida: {cardModel.getHealth()}</p>
                                    <div className="health-bar-border">
                                        <div 
                                            className={
                                                "health-bar " +
                                                (cardModel.getHealth() / cardModel.getMaxHealth() > 0.7
                                                    ? "green"
                                                    : cardModel.getHealth() / cardModel.getMaxHealth() > 0.3
                                                    ? "yellow"
                                                    : "red")
                                            }
                                            style={{
                                                width: (cardModel.getHealth() / cardModel.getMaxHealth()) * 100 + "%"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="custom-card-image">
                                <img src={cardModel.getImageUrl()} alt={`Imagen de ${cardModel.getName()}`} />
                            </div>
                            <div className="custom-card-body">
                                <div className="attack">
                                    <p className="attack-name"><strong>Ataque:</strong> {cardModel.getAttackName()}</p>
                                    <p className="attack-details">Daño: <strong>{cardModel.getAttackDamage()}</strong></p>
                                </div>
                                <div className="passive">
                                    <p className="passive-name"><strong>Habilidad:</strong> {cardModel.getPassiveName()}</p>
                                    <p className="passive-details">
                                        Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card-back">
                            <div className="custom-card-description">
                                <p>{cardModel.getDescription()}</p>
                            </div>
                        </div>
                    )}
                    <div className="custom-card-footer">
                        <img 
                            src="/assets/images/curved-arrow.svg" 
                            alt="Da la vuelta a la carta" 
                            className="flip-icon" 
                            onClick={handleFlip} 
                        />
                        <img 
                            className="magnify-icon" 
                            src="/assets/images/image7.png" 
                            alt="Ampliar carta" 
                            onClick={handleOverlayClick} 
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Card;
