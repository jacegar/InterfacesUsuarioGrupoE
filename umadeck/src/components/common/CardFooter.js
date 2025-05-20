import "../styles/common/CardFooter.css";

function CardFooter(props) {
    const handleClick = (e) => {
        e.stopPropagation(); // Detener la propagación del evento, para que no se dispare el evento del padre al pulsar los iconos
    };

    return (
        <div className="custom-card-footer" onClick={handleClick}>
            <button onClick={(e) => {
                        e.stopPropagation();
                        props.handleFlip();
                    }}
                    className="flip-button">
                <img 
                    src="/assets/images/curved-arrow.svg" 
                    alt="Da la vuelta a la carta" 
                    className="flip-icon" 
                />
            </button>
            <button onClick={(e) => {
                        e.stopPropagation();
                        props.handleMagnify();
                    }}
                    className="magnify-button">
                <img 
                    className="magnify-icon" 
                    src="/assets/images/image7.png" 
                    alt="Ampliar carta"  
                />
            </button>
        </div>
    );
}

export default CardFooter;