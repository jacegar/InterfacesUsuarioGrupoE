import "../styles/common/CardEnlarged.css";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardFooter from "./CardFooter";


function CardEnlarged(props) {
    const cardModel = props.cardModel;

    return(
        <div className="card-enlarged-clone" onClick={props.handleEnlargedCardClick}>
            {!props.showBack ? (
                <CardFront cardModel={cardModel}/>
            ) : (
                <CardBack description={cardModel.getDescription()} />
            )}
            <CardFooter handleFlip={props.handleFlip} handleMagnify={props.handleMagnify}/>
        </div>
    )
}

export default CardEnlarged;