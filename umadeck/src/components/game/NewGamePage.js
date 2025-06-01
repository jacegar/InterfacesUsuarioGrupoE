import GoBackArrow from "../common/GoBackArrow";
import { useState, useEffect } from "react";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/game/NewGamePage.css";
import { useNavigate } from "react-router-dom";
import HelpMenu from "../common/HelpMenu";
import { showStyledAlert } from "../common/StyledAlert";

function NewGamePage() {
    const [selectedCards, setCards] = useState([]);
    const [loadedCards, setLoadedCards] = useState([]);
    const [recommendedCardIndex, setRecommendedCardIndex] = useState(null);
    const [usedRecommendation, setUsedRecommendation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);
    const [cardsToShow, setCardsToShow] = useState(5);
    const navigate = useNavigate();

    const generateRandomCards = () => {
        const allCards = CardModel.getAllCards();
        
        for (let i = allCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = allCards[i];
            allCards[i] = allCards[j];
            allCards[j] = temp;
        }
        return allCards.slice(0, 5);
    }

    const selectCard = (index) => {
        const card = loadedCards[index];
        if (selectedCards.includes(card)) {
            setCards(selectedCards.filter(selectedCard => selectedCard !== card));
        } else if (selectedCards.length < 3) {
            setCards([...selectedCards, card]);
            if (index === recommendedCardIndex) {
                setRecommendedCardIndex(null);
                setUsedRecommendation(false);
            }
        }else{
            showStyledAlert("Deselecciona una carta para elegir otra.");
        }
    }

    useEffect(() => {   
        const cards = generateRandomCards();
        setLoadedCards(cards);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 1200) {
                setCardsToShow(5);
            } else if (window.innerWidth > 800) {
                setCardsToShow(3);
            } else {
                setCardsToShow(1);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const obtenerRecomendacion = () => {
        if (recommendedCardIndex !== null) {
            setRecommendedCardIndex(null);
            setUsedRecommendation(false);
        } else if (!usedRecommendation) {
            const recommendedCards = CardModel.getRecommendedCards();
            const availableCards = recommendedCards.filter(card => 
                loadedCards.some(loadedCard => loadedCard.id === card.id && !selectedCards.includes(loadedCard))
            );
            
            if (availableCards.length > 0) {
                const recommendedCard = availableCards[0];
                setRecommendedCardIndex(loadedCards.findIndex(card => card.id === recommendedCard.id));
                setUsedRecommendation(true);
            } else {
                setRecommendedCardIndex(null);
            }
        }
    }

    const cercaniaRecomendacion = () => {
        let cercania = 0;
        if (recommendedCardIndex !== null && currentIndex !== recommendedCardIndex) {
            const total = loadedCards.length;
            const derecha = (recommendedCardIndex - currentIndex + total) % total;
            const izquierda = (currentIndex - recommendedCardIndex + total) % total;
            
            if (izquierda < derecha) {
                cercania = 1;
            } else {
                cercania = 2;
            }
        }
    
        return cercania;
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedCards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + loadedCards.length) % loadedCards.length);
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!touchStartX) return;

        const touchEndX = e.touches[0].clientX;
        const deltaX = touchStartX - touchEndX;

        if (deltaX > 50) {
            handleNext();
            setTouchStartX(null);
        } else if (deltaX < -50) {
            handlePrev();
            setTouchStartX(null);
        }
    };

    return (
        <div className="newGamePage">
            <header>
                <GoBackArrow />
                <h1 className="especialh1">Elige las cartas del equipo:</h1>
                <h2 className="especialh2">{selectedCards.length} de 3</h2>
            </header>
            {isMobile ? (
                <div
                    className="card-carousel"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <button className={`carousel-button prev ${cercaniaRecomendacion() === 1 ? "recommended" : ""}`}
                            onClick={handlePrev}>←
                    </button>
                    <div className="carousel-card">
                        {loadedCards.length > 0 && (
                            <div 
                                className={currentIndex === recommendedCardIndex ? "recommended-card" : "not-recommended-card"}
                                onClick={() => selectCard(currentIndex)}
                                tabIndex="0"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        selectCard(currentIndex);
                                    }
                                }}
                            >
                                {currentIndex === recommendedCardIndex && <div className="recommended-label">Recomendada</div>}
                                <Card
                                    cardModel={loadedCards[currentIndex]}
                                    isSelected={selectedCards.includes(loadedCards[currentIndex])}
                                />
                            </div>
                        )}
                    </div>
                    <button className={`carousel-button next ${cercaniaRecomendacion() === 2 ? "recommended" : ""}`}
                            onClick={handleNext}>→
                    </button>
                </div>
            ) : (
                <div className="card-carousel desktop">
                    {cardsToShow < 5 && (
                        <button className="carousel-button prev" onClick={handlePrev}>{"<"}</button>
                    )}
                    <ul className="cardList">
                        {loadedCards.length > 0 &&
                            [...Array(cardsToShow)].map((_, i) => {
                                const offset = Math.floor(cardsToShow / 2);
                                const idx = (currentIndex - offset + i + loadedCards.length) % loadedCards.length;
                                const card = loadedCards[idx];
                                return (
                                    <li 
                                        key={idx} 
                                        className={idx === recommendedCardIndex ? "recommended-card" : "not-recommended-card"}
                                        tabIndex="0"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                selectCard(idx);
                                            }
                                        }}
                                        role="button"
                                        aria-label={`Carta de ${loadedCards[idx].name}, ${idx === recommendedCardIndex ? "recomendada" : ""}`}
                                    >
                                        {idx === recommendedCardIndex && <div className="recommended-label">Recomendada</div>}
                                        <Card
                                            cardModel={card}
                                            isSelected={selectedCards.includes(card)}
                                            onCardClick={() => selectCard(idx)}
                                        />
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {cardsToShow < 5 && (
                        <button className="carousel-button next" onClick={handleNext}>{">"}</button>
                    )}
                </div>
            )}
            
            <div>
                <button className="startGameButton" disabled={selectedCards.length !== 3}
                    onClick={() => navigate("/game", { state: {playerCards: selectedCards, enemyCards: generateRandomCards().slice(0, 3)}})}
                >
                    Iniciar partida
                </button>
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
                    hasSeenTutorial={true}
                />
            </div>

        </div>
    );
}

export default NewGamePage;