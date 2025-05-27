import { useState, useContext, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/mainmenu/Header.css";
import { ThemeContext } from "../../context/ThemeContext";

function Header(){
    const [showOptions, setShowOptions] = useState(false);
    const { darkMode, toggleDarkMode, readingMode, toggleReadingMode } = useContext(ThemeContext);
    const dropdownRef = useRef(null);
    const location = useLocation();
    
    const isMainMenu = location.pathname === "/" || location.pathname === "";

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        setShowOptions(false);
    };
    
    const handleToggleReadingMode = () => {
        toggleReadingMode();
        setShowOptions(false);
    };

    return(
        <header className="main-header">
            <div className="options-icon" ref={dropdownRef}>
                <button className = "mode-button" onClick={toggleOptions}>
                    <img 
                        src="/assets/images/theme.png" 
                        alt="Opciones"
                    />
                </button>
                {showOptions && isMainMenu && (
                    <div className="options-dropdown">
                        <button onClick={handleToggleDarkMode}>
                            {darkMode ? "Activar modo claro" : "Activar modo oscuro"}
                        </button>
                        <button onClick={handleToggleReadingMode}>
                            {readingMode ? "Activar modo claro" : "Activar modo lectura"}
                        </button>
                    </div>
                )}
            </div>
            <h1 className="game-title">UMA DeckRpg</h1>
        </header>
    );
}

export default Header;