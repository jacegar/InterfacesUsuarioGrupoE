import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/mainmenu/MainMenu.css";
import React from "react";

function MainMenu() {
    const navigate = useNavigate();
    // Lee el estado inicial del lector de pantalla desde localStorage
    const [screenReaderOn, setScreenReaderOn] = useState(() => {
        return localStorage.getItem('screenReaderOn') === 'true';
    });

    // Sincroniza el estado con localStorage y activa/desactiva el lector global
    useEffect(() => {
        localStorage.setItem('screenReaderOn', screenReaderOn ? 'true' : 'false');
        if (screenReaderOn) {
            window.enableScreenReader && window.enableScreenReader();
            
            //Mensaje de bienvenida cuando se activa
            if (window.speechSynthesis && window.speechSynthesis.speaking === false) {
                const utter = new window.SpeechSynthesisUtterance(
                    'Lector de pantalla activado. Usa tabulador o el ratón para navegar y el lector leerá los elementos seleccionados o enfocados.'
                );
                window.speechSynthesis.speak(utter);
            }
        } else {
            window.disableScreenReader && window.disableScreenReader();
        }
    }, [screenReaderOn]);

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
                        <button
                            className="menu-button-small"
                            onClick={() => {
                                if (!('speechSynthesis' in window)) {
                                    alert("Tu navegador no soporta el lector de pantalla automático.");
                                    return;
                                }
                                setScreenReaderOn(on => !on);
                            }}
                        >
                            {screenReaderOn ? "Desactivar lector de pantalla" : "Activar lector de pantalla"}
                        </button>
                    </div>
                    <div className="button-wrapper">
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
            </div>
        </main>
    );
}

export default MainMenu;