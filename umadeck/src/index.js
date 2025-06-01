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

function globalScreenReader(toggle = true) {
  if (!('speechSynthesis' in window)) return;
  if (!toggle && screenReaderActive) {

    if (screenReaderHandlers) {
      document.body.removeEventListener('focusin', screenReaderHandlers.focus, true);
      document.body.removeEventListener('mouseenter', screenReaderHandlers.mouse, true);
      screenReaderHandlers = null;
    }
    screenReaderActive = false;
    window.speechSynthesis.cancel();
    return;
  }
  if (screenReaderActive) return;
  function speakElement(element) {
    let text = element.getAttribute && element.getAttribute('aria-label');
    if (!text && element.alt) text = element.alt;
    if (!text && element.innerText) text = element.innerText;
    if (!text && element.textContent) text = element.textContent;
    if (text) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(text));
    }
  }
  function focusHandler(e) {
    speakElement(e.target);
  }
  function mouseHandler(e) {
    speakElement(e.target);
  }
  document.body.addEventListener('focusin', focusHandler, true);
  document.body.addEventListener('mouseenter', mouseHandler, true);
  screenReaderHandlers = { focus: focusHandler, mouse: mouseHandler };
  screenReaderActive = true;
}

if (typeof window !== 'undefined') {
  window.enableScreenReader = () => {
    globalScreenReader(true);
    if (window.localStorage) {
      window.localStorage.setItem('screenReaderOn', 'true');
    }
  };
  window.disableScreenReader = () => {
    globalScreenReader(false);
    if (window.localStorage) {
      window.localStorage.setItem('screenReaderOn', 'false');
    }
  };
  window.isScreenReaderActive = () => screenReaderActive;
  if (window.localStorage && window.localStorage.getItem('screenReaderOn') === 'true') {
    window.enableScreenReader();
  }
}
