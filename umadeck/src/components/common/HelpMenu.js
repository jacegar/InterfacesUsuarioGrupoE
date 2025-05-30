import "../styles/common/HelpMenu.css";
import { useState } from "react";
import Player from "../../gamelogic/Player";

function HelpMenu(props) {
    const { title, text, hasSeenTutorial, onTutorialSeen } = props;
    const [showHelp, setShowHelp] = useState(!hasSeenTutorial);
    
    const handleCloseTutorial = () => {
        if (!hasSeenTutorial) {
            const player = new Player();
            player.setSeenTutorial();
            if (onTutorialSeen) onTutorialSeen();
        }
        setShowHelp(false);
    };

    return (
        <>
            <div className="help-button-container">
                <button className="help-button" onClick={() => setShowHelp(!showHelp)}>
                    <img 
                        src="/assets/images/help-button.svg" 
                        alt="Menu de ayuda" 
                        className="help-image"
                    />
                </button>
            </div>
            {showHelp && (
                <div 
                    className="help-overlay" 
                    onClick={handleCloseTutorial}
                >
                    <div className="help-box" onClick={(e) => e.stopPropagation()}>
                        <h2 className="help-title">{title}</h2>
                        <p className="help-text">{text}</p>
                        <button 
                            className="help-close" 
                            onClick={handleCloseTutorial}
                        >Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default HelpMenu;