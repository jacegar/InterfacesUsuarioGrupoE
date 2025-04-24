import React from 'react';
import "../styles/mainmenu/PrivacyPage.css";
import GoBackArrow from "../common/GoBackArrow";

function PrivacyPage() {
    return (
        <main>
            <GoBackArrow/>
            <div className="privacy-page">
                <h1>Política de Privacidad</h1>
                <p>Bienvenido a nuestra política de privacidad. Aquí explicamos cómo manejamos tus datos personales:</p>
                <ul>
                    <li>No compartimos tu información personal con terceros.</li>
                    <li>Los datos recopilados se utilizan únicamente para mejorar tu experiencia en el juego.</li>
                    <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
                </ul>
                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
        </main>
    );
}

export default PrivacyPage;
