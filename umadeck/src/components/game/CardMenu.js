import React from 'react';
import '../styles/game/CardMenu.css';

function CardMenu({ onAttack, onAbility, onChange, isActive }) {
    if (!isActive) return null;
    
    return (
        <div className="card-menu">
            <button 
                className="menu-option" 
                onClick={onAttack}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onAttack();
                    }
                }}
            >Atacar</button>
            <button 
                className="menu-option" 
                onClick={onAbility}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onAbility();
                    }
                }}
            >Habilidad</button>
            <button 
                className="menu-option" 
                onClick={onChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onChange();
                    }
                }}
            >Cambiar</button>
        </div>
    );
}

export default CardMenu;