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

  return (
    <div className="collection-page container-fluid">
      <GoBackArrow/>  
      <h1>Collection Page</h1>
      <div className="card-count"></div>
      <div>
        <div className="row">
          {allCards.map((card) => {
            const isUnlocked = unlockedCards.includes(card.id);
            return (
              <div className="col-2" key={card.id}>
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
    </div>
  );
}

export default CollectionPage;