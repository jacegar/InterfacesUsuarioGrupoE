import "../styles/common/CardFooter.css";

function CardFooter(props) {
    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="custom-card-footer" onClick={handleClick}>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    props.handleMagnify();
                }}
                tabIndex="0"
                aria-label="Ampliar carta"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        props.handleMagnify();
                    }
                }}
                className="magnify-button">
                <img 
                    className="magnify-icon" 
                    src="/assets/images/image7.png" 
                    alt="Ampliar carta"  
                />
            </button>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    props.handleFlip();
                }}
                tabIndex="0"
                aria-label="Dar la vuelta a la carta"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        props.handleFlip();
                    }
                }}
                className="flip-button">
                <img 
                    className="flip-icon"
                    src="/assets/images/curved-arrow.svg" 
                    alt="Dar la vuelta a la carta"  
                />
            </button>
        </div>
    );
}

export default CardFooter;