import GoBackArrow from "../common/GoBackArrow";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";

function CollectionPage() {
  return (
    <div className="collection-page">
      <GoBackArrow/>  
      <h1>Collection Page</h1>
      <ul>
        <li>{/*En cada li deberia ir un componente de la clase carta*/}</li>
        <li><Card cardModel={new CardModel(1)}/></li>
      </ul>
    </div>
  );
}

export default CollectionPage;