import {Link} from "react-router-dom";
import "../styles/common/GoBackArrow.css";

function GoBackArrow(){
    return(
        <div className="go-back-arrow">
            <Link to="/">
                <img src="/assets/images/arrow-back.svg" alt="Volver atrás" />
            </Link>
        </div>
    )
}

export default GoBackArrow;