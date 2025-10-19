import { Link } from 'react-router-dom';
import { useState } from "react";
import './Header.css';

function Header() {
   const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="header">
      <h1 className="title" >Almacén de Recuerdos</h1>
      {/* Botón hamburguesa */}
      <button
        className={`hamburguesa ${menuAbierto ? "activo" : ""}`}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* <nav className="nav"> */}
      <nav className={`nav ${menuAbierto ? "visible" : ""}`}>
        <Link to="/home" className="navLink">Inicio</Link>
        <Link to="/proyectos" className="navLink">Proyectos</Link>
        <Link to="/sobre-mi" className="navLink">Sobre mí</Link>
        <Link to="/estados" className="navLink">Estados</Link>
        <button className="button">Contacto</button>
      </nav>
    </header>
  );
}

export default Header;