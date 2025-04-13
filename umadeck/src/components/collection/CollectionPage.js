import GoBackArrow from "../common/GoBackArrow";
import Card from "../common/Card";
import CardModel from "../../gamelogic/CardModel";
import { useEffect, useState } from "react";

function CollectionPage() {
  const [card,setCard] = useState(new CardModel());

  //Aqui solo lee una carta, pero deberia leer todas las cartas de la coleccion y mostrarlas en la lista
  useEffect(() => {
    fetch("/assets/cards/card1.json")
      .then((response) => response.json())
      .then((data) => {
        const cardModel = new CardModel();
        cardModel.fromJson(JSON.stringify(data));
        setCard(cardModel);
      })
      .catch((error) => console.error("Error loading card data:", error));
  }, []);

  return (
    <div className="collection-page">
      <GoBackArrow/>  
      <h1>Collection Page</h1>
      <ul>
        <li>{/*En cada li deberia ir un componente de la clase carta*/}</li>
        <li><Card cardModel={card}/></li>
      </ul>
    </div>
  );
}

export default CollectionPage;