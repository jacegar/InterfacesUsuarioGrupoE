import GoBackArrow from "../common/GoBackArrow";
import { useState, useEffect } from "react";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/NewGamePage.css";
import { Link } from "react-router-dom";

//Desde esta pagina se deberia poder elegir las cartas para la nueva partida
function NewGamePage() {
    const [selectedCards, setCards] = useState([]);
    const [loadedCards, setLoadedCards] = useState([]);

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

    const selectCard = (index) => {
        if(selectedCards.includes(loadedCards[index])) {
            setCards(selectedCards.filter(card => card !== loadedCards[index]));
        }else if(selectedCards.length < 3) {
            setCards([...selectedCards, loadedCards[index]]);
        }/*else{
            mostrar de forma visual que no se pueden elegir mas cartas
        }*/
    }

    useEffect(() => {   
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
                        <Card cardModel={card}
                              isSelected = {selectedCards.includes(card)}
                              onCardClick={() => selectCard(index)}/>
                    </li>
                ))}
            </ul>
            <div>
                <Link to="/game" state={{ playerCards: selectedCards, enemyCards: generateRandomCards().slice(0, 3)}}>
                    <button className="startGameButton" disabled={selectedCards.length !== 3}>Iniciar partida</button>
                </Link>
            </div>
        </div>
    );
}

export default NewGamePage;