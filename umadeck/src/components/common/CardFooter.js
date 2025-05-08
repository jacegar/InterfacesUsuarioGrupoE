import "../styles/common/CardFooter.css";

function CardFooter(props){
    return(
        <div className="custom-card-footer">
            <img 
                src="/assets/images/curved-arrow.svg" 
                alt="Da la vuelta a la carta" 
                className="flip-icon" 
                onClick={props.handleFlip} 
            />
            <img 
                className="magnify-icon" 
                src="/assets/images/image7.png" 
                alt="Ampliar carta" 
                onClick={props.handleMagnify} 
            />
        </div>
    )
}

export default CardFooter;