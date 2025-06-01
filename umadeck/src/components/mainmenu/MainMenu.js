import { useNavigate } from "react-router-dom";
import "../styles/mainmenu/MainMenu.css";
import React from "react";

function MainMenu(){
    const navigate = useNavigate();
    const [screenReaderOn, setScreenReaderOn] = React.useState(false);

    // Función para leer el aria-label o el texto del botón
    function speakElement(element) {
        if ('speechSynthesis' in window) {
            let text = element.getAttribute('aria-label') || element.innerText || element.textContent;
            if (text) {
                const utter = new window.SpeechSynthesisUtterance(text);
                window.speechSynthesis.cancel(); // Para evitar solapamientos
                window.speechSynthesis.speak(utter);
            }
        }
    }

    // Efecto para añadir listeners a los botones del menú
    React.useEffect(() => {
        const menu = document.querySelector('.main-menu');
        if (!menu) return;
        function handleEvent(e) {
            if (screenReaderOn) {
                speakElement(e.target);
            }
        }
        const buttons = menu.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('focus', handleEvent);
            btn.addEventListener('mouseenter', handleEvent);
        });
        return () => {
            buttons.forEach(btn => {
                btn.removeEventListener('focus', handleEvent);
                btn.removeEventListener('mouseenter', handleEvent);
            });
        };
    }, [screenReaderOn]);

    React.useEffect(() => {
        // Apaga el lector si el estado cambia a off
        if (!screenReaderOn && window.isScreenReaderActive && window.isScreenReaderActive()) {
            window.speechSynthesis.cancel();
            setTimeout(() => {
                window.disableScreenReader && window.disableScreenReader();
            }, 100); // Espera a que termine de hablar
        }
    }, [screenReaderOn]);

    // Sincroniza el estado del lector con localStorage (por defecto desactivado)
    React.useEffect(() => {
        localStorage.setItem('screenReaderOn', 'false'); // Siempre desactivado al cargar
        setScreenReaderOn(false);
        if (window.disableScreenReader) window.disableScreenReader();
    }, []);

    React.useEffect(() => {
        localStorage.setItem('screenReaderOn', screenReaderOn ? 'true' : 'false');
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
                        <button className="menu-button-small" onClick={() => navigate("/privacy")}>
                            Privacidad
                        </button>
                    </div>
                    <div className="menu-link-small">
                        <button className="menu-button-small" onClick={() => navigate("/conditions")}>
                            Condiciones
                        </button>
                    </div>
                    <div className="menu-link-small">
                        <button className="menu-button-small" onClick={() => {
                            if ('speechSynthesis' in window) {
                                if (screenReaderOn) {
                                    window.speechSynthesis.cancel();
                                    if (window.disableScreenReader) window.disableScreenReader();
                                    setScreenReaderOn(false);
                                } else {
                                    if (window.enableScreenReader) window.enableScreenReader();
                                    setScreenReaderOn(true);
                                    const utter = new window.SpeechSynthesisUtterance('Lector de pantalla activado. Usa tabulador o el ratón para navegar y el lector leerá los elementos seleccionados o enfocados.');
                                    window.speechSynthesis.speak(utter);
                                }
                            } else {
                                alert('El lector de pantalla no está soportado en este navegador.');
                            }
                        }} aria-label={screenReaderOn ? "Desactivar lector de pantalla" : "Activar lector de pantalla"}>
                            {screenReaderOn ? "Desactivar lector de pantalla" : "Activar lector de pantalla"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainMenu;