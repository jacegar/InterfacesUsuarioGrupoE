import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import StartPage from './components/mainmenu/StartPage';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

reportWebVitals();

// Lector de pantalla global para toda la app
let screenReaderActive = false;
let screenReaderHandlers = null;

function speakElement(element) {
    if (!('speechSynthesis' in window)) return;
    
    let text = element.getAttribute && element.getAttribute('aria-label');
    if (!text && element.alt) text = element.alt;
    if (!text && element.innerText) text = element.innerText;

    // Para leer botones y enlaces con imágenes
    if (!text) {
        const img = element.querySelector && element.querySelector('img[alt]');
        if (img && img.alt) text = img.alt;
    }

    if (text) {
        window.speechSynthesis.cancel();

        // Esperar un poco antes de hablar para evitar problemas de sincronización
        setTimeout(() => {
            if (!window.speechSynthesis.speaking) {
                window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(text));
            }
        }, 100);
    }
}

function focusHandler(e) { speakElement(e.target); }
function mouseHandler(e) { speakElement(e.target); }

function enableScreenReader() {
    if (!('speechSynthesis' in window) || screenReaderActive) return;
        document.body.addEventListener('focusin', focusHandler, true);
        document.body.addEventListener('mouseenter', mouseHandler, true);
        screenReaderHandlers = { focus: focusHandler, mouse: mouseHandler };
        screenReaderActive = true;
}

function disableScreenReader() {
    if (!screenReaderActive) return;
    if (screenReaderHandlers) {
        document.body.removeEventListener('focusin', screenReaderHandlers.focus, true);
        document.body.removeEventListener('mouseenter', screenReaderHandlers.mouse, true);
        screenReaderHandlers = null;
    }

    screenReaderActive = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function isScreenReaderActive() {
    return screenReaderActive;
}

if (typeof window !== 'undefined') {
    window.enableScreenReader = enableScreenReader;
    window.disableScreenReader = disableScreenReader;
    window.isScreenReaderActive = isScreenReaderActive;
    
    // Activa el lector si estaba activo en la sesión anterior
    if (window.localStorage && window.localStorage.getItem('screenReaderOn') === 'true') {
        window.enableScreenReader();
    }
}
