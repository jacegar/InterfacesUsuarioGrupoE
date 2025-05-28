import "../styles/common/ConfirmationMenu.css";

function ConfirmationMenu(props){
    const{onConfirm, onCancel, text} = props;
    
    return(
    <div className="confirmation-dialog">
                    <p>{text}</p>
                    <a className="confirm-button" onClick={onConfirm}>
                        Sí
                    </a>
                    <button className="cancel-button" onClick={onCancel}>
                        No
                    </button>
                </div>
    );
}

export default ConfirmationMenu;