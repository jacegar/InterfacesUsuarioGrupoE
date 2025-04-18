import React from 'react';
import '../styles/CardMenu.css';

function CardMenu({ onAttack, onAbility, onChange, isActive }) {
    if (!isActive) return null;
    
    return (
        <div className="card-menu">
            <button className="menu-option" onClick={onAttack}>Atacar</button>
            <button className="menu-option" onClick={onAbility}>Habilidad</button>
            <button className="menu-option" onClick={onChange}>Cambiar</button>
        </div>
    );
}

export default CardMenu;