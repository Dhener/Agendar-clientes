import React from 'react';
import './Navbar.css';
import logo from "../Imagens/schedule.png";
const Navbar = () => {

    const sairDaPagina = () => {
        window.location.replace("/");
    }

    return (
        <div className='navbar'>
            <div className="navbar-logo">
                <img src={logo} alt="" />
                <h2>Ricardo Coiffeur</h2>
            </div>
            {window.location.pathname === "/" ? <></> : <div className="navbar-btn"><button onClick={sairDaPagina} >Sair</button></div>}
        </div>
    );
}

export default Navbar;
