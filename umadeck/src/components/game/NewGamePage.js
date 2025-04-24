import GoBackArrow from "../common/GoBackArrow";
import { useState, useEffect } from "react";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/game/NewGamePage.css";
import { Link } from "react-router-dom";
import HelpMenu from "../common/HelpMenu";

//Desde esta pagina se deberia poder elegir las cartas para la nueva partida
function NewGamePage() {
    const [selectedCards, setCards] = useState([]);
    const [loadedCards, setLoadedCards] = useState([]);
    const [recommendedCardIndex, setRecommendedCardIndex] = useState(null);
    const [usedRecommendation, setUsedRecommendation] = useState(false);

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
        const cards = generateRandomCards();
        setLoadedCards(cards);
    }, []);
    
    const obtenerRecomendacion = () => {
        if (recommendedCardIndex !== null) {
            setRecommendedCardIndex(null);
            setUsedRecommendation(false);
        } else if (!usedRecommendation) {
            const strongCards = CardModel.getStrongCards();
            const randomIndex = Math.floor(Math.random() * strongCards.length);
            const recommendedCard = strongCards[randomIndex];
            if (loadedCards.filter(card => card.id === recommendedCard.id).length > 0) {
                setRecommendedCardIndex(loadedCards.findIndex(card => card.id === recommendedCard.id));
            } else {
                setRecommendedCardIndex(Math.floor(Math.random() * loadedCards.length));
            }

            setUsedRecommendation(true);
        }
    }

    return (
        <div className="newGamePage">
            <header>
                <GoBackArrow />
                <h1 className="especialh1">Elige las cartas del equipo:</h1>
                <h2 className="especialh2">{selectedCards.length} de 3</h2>
            </header>
            <div className="cardList-zoom">
                <ul className="cardList">
                    {loadedCards.map((card, index) => (
                        <li key={index} className={index === recommendedCardIndex ? "recommended-card" : "not-recommended-card"}>
                            {index === recommendedCardIndex && <div className="recommended-label">Recomendada</div>}
                            <Card cardModel={card}
                                isSelected = {selectedCards.includes(card)}
                                onCardClick={() => selectCard(index)}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Link to="/game" state={{ playerCards: selectedCards, enemyCards: generateRandomCards().slice(0, 3)}}>
                    <button className="startGameButton" disabled={selectedCards.length !== 3}>Iniciar partida</button>
                </Link>
            </div>
            <div className="contenedor-del-boton">
                <button className="recommendation-button" onClick={obtenerRecomendacion}>
                    Recomendación
                </button>
                
                <HelpMenu
                    className="help-menu"
                    title={<span className="help-menu-title">Ayuda del Juego</span>}
                    text={
                        <div className="help-menu-text">
                            <p><strong>Botones disponibles:</strong></p>
                            <ul>
                                <li><strong>Flecha atrás:</strong> Vuelve a la página anterior.</li>
                                <li><strong>Lupa:</strong> Pone en grande la carta. Tambien se pone en grande al mantener encima de la carta.</li>
                                <li><strong>Flecha semicircular:</strong> Da la vuelta a la carta.</li>
                                <li><strong>Iniciar Partida:</strong> Comienza la partida con las 3 cartas seleccionadas.</li>
                                <li><strong>Recomendación:</strong> Recomienda una carta poderosa. </li>
                            </ul>
                            <p><strong>Funcionamiento básico:</strong></p>
                            <ul>
                                <li> Pincha en una carta para seleccionarla o deseleccionarla.</li>
                                <li> Conforma tu equipo con 3 cartas.</li>
                                <li> Usa las recomendaciones si no sabes qué elegir.</li>
                            </ul>
                        </div>
                    }
                />
            </div>

        </div>
    );
}

export default NewGamePage;