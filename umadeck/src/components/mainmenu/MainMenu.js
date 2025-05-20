import { useNavigate } from "react-router-dom";
import "../styles/mainmenu/MainMenu.css";

function MainMenu(){
    const navigate = useNavigate();

    return (
        <main className="main-menu">
            <div className="menu-options">
                <div className="menu-link">
                    <button className="menu-button" onClick={() => navigate("/new-game")}>
                        Partida Nueva
                    </button>
                </div>
                <div className="menu-link">
                    <button className="menu-button" onClick={() => navigate("/achievements")}>
                        Logros
                    </button>
                </div>
                <div className="menu-link">
                    <button className="menu-button" onClick={() => navigate("/collection")}>
                        Colección
                    </button>
                </div>
                <div className="small-buttons-container">
                    <div className="menu-link-small">
                        <button className="menu-button-small" onClick={() => navigate("/privacy")}>
                            Privacidad
                        </button>
                    </div>
                    <div className="menu-link-small">
                        <button className="menu-button-small" onClick={() => navigate("/conditions")}>
                            Condiciones
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainMenu;