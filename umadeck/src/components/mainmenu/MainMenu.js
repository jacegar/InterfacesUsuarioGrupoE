import { Link } from "react-router-dom";

function MainMenu(){
    return (
        <div>
            <Link to="/new-game">
                <button>Partida Nueva</button>
            </Link>
            <Link to= "/achievements">
                <button>Logros</button>
            </Link>
            <Link to= "/collection">
                <button>Colección</button>
            </Link>
        </div>
    );
}

export default MainMenu;