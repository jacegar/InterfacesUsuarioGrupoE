import "../styles/common/Card.css";
import { useState, useRef, useEffect } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardFooter from "./CardFooter";
import CardEnlarged from "./CardEnlarged";

function Card(props) {
    const { cardModel, isSelected, onCardClick, isHighlighted} = props;
    const [showEnlarged, setShowEnlarged] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const timerRef = useRef(null);
    
    const animateAttack = () => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 700);
        const audio = new Audio("/assets/sounds/sound1.mp3");
        audio.volume = 0.5;
        audio.play();
    };

    useEffect(() => {
        if (props.attachRef) {
            props.attachRef({
                animateAttack
            });
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    });
    
    const handleMouseDown = (event) => {
        if (showEnlarged || event.target.closest(".custom-card-footer")) return;
        
        timerRef.current = setTimeout(() => {
            setShowEnlarged(true);
            setShowOverlay(true);
        }, 1000);
    };
    
    const handleMouseUp = (event) => {
        if (event.target.closest(".custom-card-footer")) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            
            if (!showEnlarged && onCardClick) {
                onCardClick();
            }
        }
    };
    
    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    
    const handleOverlayClick = (event) => {
        if(event !== undefined){
            event.stopPropagation();
        }
        setShowEnlarged(false);
        setShowOverlay(false);
    };
    
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
