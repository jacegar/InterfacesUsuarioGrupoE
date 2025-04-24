import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/mainmenu/MainMenu.css";

function MainMenu(){
    const [hovered, setHovered] = useState(null);

    return (
        <main className="main-menu-container">
            <div className="menu-options">
                <Link to="/new-game" className="menu-link">
                    <button 
                        className={`menu-button ${hovered === 'newGame' ? 'hovered' : ''}`}
                        onMouseEnter={() => setHovered('newGame')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Partida Nueva
                    </button>
                </Link>
                <Link to="/achievements" className="menu-link">
                    <button 
                        className={`menu-button ${hovered === 'achievements' ? 'hovered' : ''}`}
                        onMouseEnter={() => setHovered('achievements')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Logros
                    </button>
                </Link>
                <Link to="/collection" className="menu-link">
                    <button 
                        className={`menu-button ${hovered === 'collection' ? 'hovered' : ''}`}
                        onMouseEnter={() => setHovered('collection')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Colección
                    </button>
                </Link>
                
                <div className="small-buttons-container">
                    <Link to="/privacy" className="menu-link-small">
                        <button 
                            className={`menu-button-small ${hovered === 'privacy' ? 'hovered' : ''}`}
                            onMouseEnter={() => setHovered('privacy')}
                            onMouseLeave={() => setHovered(null)}
                        >
                            Privacidad
                        </button>
                    </Link>
                    <Link to="/conditions" className="menu-link-small">
                        <button 
                            className={`menu-button-small ${hovered === 'terms' ? 'hovered' : ''}`}
                            onMouseEnter={() => setHovered('terms')}
                            onMouseLeave={() => setHovered(null)}
                        >
                            Condiciones
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default MainMenu;