import GoBackArrow from "../common/GoBackArrow";

function CollectionPage() {
  return (
    <div className="collection-page">
      <GoBackArrow/>  
      <h1>Collection Page</h1>
      <ol>
        <li>{/*En cada li deberia ir un componente de la clase carta*/}</li>
      </ol>
    </div>
  );
}

export default CollectionPage;