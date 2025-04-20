import { useState, useContext, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Header.css";
import { ThemeContext } from "../../context/ThemeContext";

function Header(){
    const [showOptions, setShowOptions] = useState(false);
    const { darkMode, toggleDarkMode, readingMode, toggleReadingMode } = useContext(ThemeContext);
    const dropdownRef = useRef(null);
    const location = useLocation();
    
    // Check if we're on the main menu (home page)
    const isMainMenu = location.pathname === "/" || location.pathname === "";

    // Close dropdown when clicking outside
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
        <div className="main-header">
            <div className="options-icon" ref={dropdownRef}>
                <img 
                    src="/assets/images/opciones.png" 
                    alt="Opciones"
                    onClick={toggleOptions}
                />
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
        </div>
    );
}

export default Header;