import "../styles/Header.css";

function Header(){
    return(
    <div className="main-header">
        <div className="options-icon">
            <img src="/assets/images/opciones.png" alt="Opciones" />
        </div>
        <h1 className="game-title">UMA DeckRpg</h1>
    </div>);
}

export default Header;