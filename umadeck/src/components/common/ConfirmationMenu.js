import "../styles/ConfirmationMenu.css";

function ConfirmationMenu(props){
    const{onConfirm, onCancel, text} = props;
    
    return(
    <div className="confirmation-dialog">
                    <p>{text}</p>
                    <button className="confirm-button" onClick={onConfirm}>
                        Sí
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        No
                    </button>
                </div>
    );
}

export default ConfirmationMenu;