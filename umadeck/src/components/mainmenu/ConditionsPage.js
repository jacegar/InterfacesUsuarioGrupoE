import React from 'react';
import "../styles/ConditionsPage.css";

function ConditionsPage() {
    return (
        <div className="conditions-page">
            <h1>Términos y Condiciones</h1>
            <p>Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones:</p>
            <ul>
                <li>El contenido del juego es propiedad de los desarrolladores.</li>
                <li>No está permitido distribuir o modificar el juego sin autorización.</li>
                <li>El uso indebido de la aplicación puede resultar en la suspensión de tu cuenta.</li>
            </ul>
            <p>Gracias por jugar y respetar nuestras reglas.</p>
        </div>
    );
}

export default ConditionsPage;
