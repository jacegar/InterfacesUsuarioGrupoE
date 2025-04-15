import GoBackArrow from "../common/GoBackArrow";
import { useState, useEffect } from "react"; // Add useEffect
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/NewGamePage.css"; // Import the CSS file for styling

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
                {/*Aqui deberia crearse una pagina de partida, pasandole selectedCards como argumento*/}
                <button className="startGameButton">Iniciar partida</button>
            </div>
        </div>
    );
}

export default NewGamePage;