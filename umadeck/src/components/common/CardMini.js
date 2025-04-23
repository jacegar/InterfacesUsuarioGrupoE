import "../styles/CardMini.css";
import { useState, useRef, useEffect } from "react";

function CardMini(props) {
    const { cardModel, onCardClick, isHighlighted } = props;
    const [showEnlarged, setShowEnlarged] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const timerRef = useRef(null);
    
    // Clean up timer if component unmounts
    useEffect(() => {
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
    
    const handleFlip = () => {
        setShowBack(!showBack);
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

    return (
        <>
            {showOverlay && <div className="mini-overlay active" onClick={handleOverlayClick}></div>}
            
            {/* Original card stays in place */}
            <div 
                className={`card-mini ${isHighlighted ? 'highlighted' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                {!showBack ? (
                    <>
                        <div className="card-mini-header">
                            <h2 className="card-mini-name">{cardModel.getName()}</h2>
                            <div className="health-box">
                                <p className="card-mini-health">Vida: {cardModel.getHealth()}</p>
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
                        <div className="card-mini-image">
                            <img src={cardModel.getImageUrl()} alt={`Imagen de ${cardModel.getName()}`} />
                        </div>
                        <div className="card-mini-body">
                            <div className="card-mini-attack">
                                <p className="card-mini-attack-name"><strong>Ataque:</strong> {cardModel.getAttackName()}</p>
                                <p className="card-mini-attack-details">Daño: <strong>{cardModel.getAttackDamage()}</strong></p>
                            </div>
                            <div className="card-mini-passive">
                                <p className="card-mini-passive-name"><strong>Habilidad:</strong> {cardModel.getPassiveName()}</p>
                                <p className="card-mini-passive-details">
                                    Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="card-mini-back">
                        <div className="card-mini-description">
                            <p>{cardModel.getDescription()}</p>
                        </div>
                    </div>
                )}
                <div className="card-mini-footer">
                    <img 
                        src="/assets/images/curved-arrow.svg" 
                        alt="Da la vuelta a la carta" 
                        className="flip-icon" 
                        onClick={handleFlip} // Llama a la función para voltear la carta
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
                <div className="mini-card-enlarged-clone" onClick={handleEnlargedCardClick}>
                    {!showBack ? (
                        <>
                            <div className="card-mini-header">
                                <h2 className="card-mini-name">{cardModel.getName()}</h2>
                                <div className="health-box">
                                    <p className="card-mini-health">Vida: {cardModel.getHealth()}</p>
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
                            <div className="card-mini-image">
                                <img src={cardModel.getImageUrl()} alt={`Imagen de ${cardModel.getName()}`} />
                            </div>
                            <div className="card-mini-body">
                                <div className="card-mini-attack">
                                    <p className="card-mini-attack-name"><strong>Ataque:</strong> {cardModel.getAttackName()}</p>
                                    <p className="card-mini-attack-details">Daño: <strong>{cardModel.getAttackDamage()}</strong></p>
                                </div>
                                <div className="card-mini-passive">
                                    <p className="card-mini-passive-name"><strong>Habilidad:</strong> {cardModel.getPassiveName()}</p>
                                    <p className="card-mini-passive-details">
                                        Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="card-mini-back">
                            <div className="card-mini-description">
                                <p>{cardModel.getDescription()}</p>
                            </div>
                        </div>
                    )}
                    <div className="card-mini-footer">
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

export default CardMini;