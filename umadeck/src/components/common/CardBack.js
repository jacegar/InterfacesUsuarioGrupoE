import "../styles/common/CardBack.css";

function CardBack(props){
    const description = props.description;

    return(
        <div className="card-back">
            <div className="custom-card-description">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default CardBack;