import "../styles/ErrorPage.css";
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <h1>404 - Página No Encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <button className="error-button" onClick={() => navigate('/')}>
                Regresar al menú principal
            </button>
        </div>
    );
}

export default ErrorPage;