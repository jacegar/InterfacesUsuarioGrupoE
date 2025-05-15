import "../styles/common/CardFooter.css";

function CardFooter(props) {
    const handleClick = (e) => {
        e.stopPropagation(); // Detener la propagación del evento
    };

    return (
        <div className="custom-card-footer" onClick={handleClick}>
            <img 
                src="/assets/images/curved-arrow.svg" 
                alt="Da la vuelta a la carta" 
                className="flip-icon" 
                onClick={(e) => {
                    e.stopPropagation(); // Detener propagación
                    props.handleFlip();
                }} 
            />
            <img 
                className="magnify-icon" 
                src="/assets/images/image7.png" 
                alt="Ampliar carta" 
                onClick={(e) => {
                    e.stopPropagation(); // Detener propagación
                    props.handleMagnify();
                }} 
            />
        </div>
    );
}

export default CardFooter;