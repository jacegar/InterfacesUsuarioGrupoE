import GoBackArrow from "../common/GoBackArrow";

//Desde esta pagina se deberia poder elegir las cartas para la nueva partida
function NewGame(){
    return (
        <div>
            <GoBackArrow/>
            <h1>Elige las cartas del equipo</h1>
        </div>
    );
}

export default NewGame;