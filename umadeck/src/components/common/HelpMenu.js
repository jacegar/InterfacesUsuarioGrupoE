import "../styles/common/HelpMenu.css";
import { useState } from "react";

function HelpMenu(props){
    const [showHelp, setShowHelp] = useState(false);
    const {title, text} = props;
    return (
        <>
            <div>
                <button className="help-button" onClick={() => setShowHelp(!showHelp)}>
                    <img 
                        src="/assets/images/help-button.svg" 
                        alt="Menu de ayuda" 
                        className="help-image"
                    />
                </button>
            </div>
            {showHelp && (
                <div className="help-overlay" onClick={() => setShowHelp(false)}>
                    <div className="help-box" onClick={(e) => e.stopPropagation()}>
                        <h2 className="help-title">{title}</h2>
                        <p className="help-text">{text}</p>
                        <button className="help-close" onClick={() => setShowHelp(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default HelpMenu;