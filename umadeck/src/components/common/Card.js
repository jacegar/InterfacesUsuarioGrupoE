import "../styles/Card.css";
import { useState, useRef, useEffect } from "react";

function Card(props) {
    const { cardModel, isSelected, onCardClick } = props;
    const [showEnlarged, setShowEnlarged] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const timerRef = useRef(null);
    
    const animateAttack = () => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 700); // Duración de la animación
    };

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

    useEffect(() => {
        if (props.attachRef) {
            props.attachRef({
                animateAttack
            });
        }
    }, []);

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
                <div className="custom-card-header">
                    <h2 className="custom-card-name">{cardModel.getName()}</h2>
                    <p className="custom-card-health">Vida: {cardModel.getHealth()}</p>
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
                        <p className="passive-name"><strong>Pasiva:</strong> {cardModel.getPassiveName()}</p>
                        <p className="passive-details">
                            Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                        </p>
                    </div>
                </div>
                <div className="custom-card-footer">
                    <img src="/assets/images/curved-arrow.svg" alt="Da la vuelta a la carta" />
                </div>
            </div>
            
            {/* Enlarged clone that appears in the center */}
            {showEnlarged && (
                <div className="card-enlarged-clone" onClick={handleEnlargedCardClick}>
                    <div className="custom-card-header">
                        <h2 className="custom-card-name">{cardModel.getName()}</h2>
                        <p className="custom-card-health">Vida: {cardModel.getHealth()}</p>
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
                            <p className="passive-name"><strong>Pasiva:</strong> {cardModel.getPassiveName()}</p>
                            <p className="passive-details">
                                Tipo: <strong>{cardModel.getPassiveType()}</strong> - Cantidad: <strong>{cardModel.getPassiveQuantity()}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="custom-card-footer">
                        <img src="/assets/images/curved-arrow.svg" alt="Da la vuelta a la carta" />
                    </div>
                </div>
            )}
        </>
    );
}

export default Card;