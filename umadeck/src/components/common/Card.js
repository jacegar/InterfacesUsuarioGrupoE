import "../styles/common/Card.css";
import { useState, useRef, useEffect } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardFooter from "./CardFooter";
import CardEnlarged from "./CardEnlarged";

function Card(props) {
    const { cardModel, isSelected, onCardClick, attachRef, isHighlighted} = props;
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
    
    const handleMouseDown = (event) => {
        //Prevenimos que se activen a la vez el click en la carta y los clicks en los botones inferiores
        if (showEnlarged || event.target.closest(".custom-card-footer")) return;
        
        // Start a timer to show enlarged after 1 second
        timerRef.current = setTimeout(() => {
            setShowEnlarged(true);
            setShowOverlay(true);
        }, 1000);
    };
    
    const handleMouseUp = (event) => {
        //Prevenimos que se activen a la vez el click en la carta y los clicks en los botones inferiores
        if (event.target.closest(".custom-card-footer")) return;

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
    const handleOverlayClick = (event) => {
        if(event !== undefined){
            event.stopPropagation();
        }
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
            
            <div 
                className={`custom-card${isSelected ? " selected" : ""}${isAttacking ? " attacking" : ""}${isHighlighted ? " highlighted" : ""}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                {!showBack ? (
                    <CardFront cardModel={cardModel} />
                ) : (
                    <CardBack description={cardModel.getDescription()} />
                )}
                <CardFooter handleFlip={handleFlip} handleMagnify={handleMagnifyClick}/>
            </div>
            
            {showEnlarged && (
                <CardEnlarged 
                    cardModel={cardModel}
                    showBack={showBack}
                    handleEnlargedCardClick={handleEnlargedCardClick}
                    handleFlip={handleFlip}
                    handleMagnify={handleOverlayClick}
                />
            )}
        </>
    );
}

export default Card;
