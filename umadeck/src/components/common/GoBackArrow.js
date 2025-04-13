import {Link} from "react-router-dom";
import "./GoBackArrow.css";

//Esta flecha es un componente que se utiliza para volver al inicio
function GoBackArrow(){
    return(
        <div className="go-back-arrow">
            <Link to="/">
                <img src="/assets/images/arrow-back.svg" alt="Go Back" />
            </Link>
        </div>
    )
}

export default GoBackArrow;