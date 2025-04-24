import "../styles/common/BlankCard.css";

//Carta vacia
function BlankCard(){
    return(
        <div className="blank-card">
            <img src="/assets/images/locked.svg" alt="carta bloqueada"></img>
        </div>
    );
}

export default BlankCard;