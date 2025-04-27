import { Link } from "react-router-dom";
import "../styles/mainmenu/MainMenu.css";

function MainMenu(){
    return (
        <main className="main-menu">
            <div className="menu-options">
                <Link to="/new-game" className="menu-link">
                    <button className="menu-button">
                        Partida Nueva
                    </button>
                </Link>
                <Link to="/achievements" className="menu-link">
                    <button className="menu-button">
                        Logros
                    </button>
                </Link>
                <Link to="/collection" className="menu-link">
                    <button className="menu-button">
                        Colección
                    </button>
                </Link>
                
                <div className="small-buttons-container">
                    <Link to="/privacy" className="menu-link-small">
                        <button className="menu-button-small">
                            Privacidad
                        </button>
                    </Link>
                    <Link to="/conditions" className="menu-link-small">
                        <button className="menu-button-small">
                            Condiciones
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default MainMenu;