import React from 'react';
import "../styles/mainmenu/ConditionsPage.css";
import GoBackArrow from "../common/GoBackArrow";

function ConditionsPage() {
    return (
        <main>
            <GoBackArrow/>
            <div className="conditions-page">
                <h1>Términos y Condiciones</h1>
                <p>Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones:</p>
                <ul>
                    <li>El contenido del juego es propiedad de los desarrolladores.</li>
                    <li>No está permitido distribuir o modificar el juego sin autorización.</li>
                    <li>El uso indebido de la aplicación puede resultar en la suspensión de tu cuenta.</li>
                    <li>Al jugar a este juego aceptas que tu alma sea propiedad de la UMA.</li>
                </ul>
                <h2>Gracias por jugar y respetar nuestras reglas.</h2>
            </div>
        </main>
    );
}

export default ConditionsPage;
