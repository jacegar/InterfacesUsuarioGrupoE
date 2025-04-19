import GoBackArrow from "../common/GoBackArrow";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import "../styles/CollectionPage.css";
import Player from "../../gamelogic/Player";
import BlankCard from "../common/BlankCard";

function CollectionPage() {
  const allCards = CardModel.getAllCards();
  const player = new Player();
  const unlockedCards = player.getUnlockedCards();
  const unlockedCount = unlockedCards.length;

  return (
    <div className="collection-page">
      <div className="collection-header">
        <GoBackArrow />
        <h1>Collection Page</h1>
        <div className="card-count">{unlockedCount}/{allCards.length}</div>
      </div>
        <div className="cards-grid">
          {allCards.map((card) => {
            const isUnlocked = unlockedCards.includes(card.id);
            return (
              <div key={card.id}>
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