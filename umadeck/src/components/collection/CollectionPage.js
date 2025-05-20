import GoBackArrow from "../common/GoBackArrow";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/collection/CollectionPage.css";
import Player from "../../gamelogic/Player";
import BlankCard from "../common/BlankCard";
import HelpMenu from "../common/HelpMenu";
import { showStyledAlert } from "../common/StyledAlert";

function CollectionPage() {
  const allCards = CardModel.getAllCards();
  const player = new Player();
  const unlockedCards = player.getUnlockedCards();
  const unlockedCount = unlockedCards.length;

  const handleLockedCardClick = () => {
    showStyledAlert("Desbloquea esta carta para poder verla");
  };

  return (
    <div className="collection-page">
      <header className="collection-header">
        <GoBackArrow />
        <div className="header-content">
          <h1>Colección</h1>
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
                </ul>
              </div>
            }
            gameStarted={false}
          />
        </div>
        <div className="card-count">{unlockedCount}/{allCards.length}</div>
      </header>
      <div className="cards-grid">
        {allCards.map((card) => {
          const isUnlocked = unlockedCards.includes(card.id);
          return (
            <div key={card.id} onClick={!isUnlocked ? handleLockedCardClick : undefined}>
              {isUnlocked ? (
                <Card cardModel={card} />
              ) : (
                <BlankCard />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionPage;