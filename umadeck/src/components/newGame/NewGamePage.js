import GoBackArrow from "../common/GoBackArrow";
import { useState, useEffect } from "react"; // Add useEffect
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";

//Desde esta pagina se deberia poder elegir las cartas para la nueva partida
function NewGamePage() {
    const [selectedCards, setCards] = useState([]);

    return (
        <div className="newGamePage">
            <GoBackArrow />
            <div>
                <h1>Elige las cartas del equipo:</h1>
                <h1>{selectedCards.length} de 3</h1>
            </div>
            <ul className="cardList">
                {loadedCards.map((card, index) => (
                    <li key={index}>
                        <Card cardModel={card} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewGamePage;