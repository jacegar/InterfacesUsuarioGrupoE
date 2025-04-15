import GoBackArrow from "../common/GoBackArrow";
import { useState, useEffect } from "react"; // Add useEffect
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/NewGamePage.css"; // Import the CSS file for styling

//Desde esta pagina se deberia poder elegir las cartas para la nueva partida
function NewGamePage() {
    const [selectedCards, setCards] = useState([]);
    const [loadedCards, setLoadedCards] = useState([]);

    useEffect(() => {
        const generateRandomCards = () => {
            const allCards = CardModel.getAllCards();
            
            // Shuffle the array
            for (let i = allCards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = allCards[i];
                allCards[i] = allCards[j];
                allCards[j] = temp;
            }

            return allCards.slice(0, 5);
        }

        setLoadedCards(generateRandomCards());
    }, []);
    
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