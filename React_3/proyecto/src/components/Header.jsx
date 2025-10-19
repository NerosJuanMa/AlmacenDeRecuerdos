import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="title">Mi Portafolio</h1>
      <nav className="nav">
        <Link to="/" className="navLink">Inicio</Link>
        <Link to="/home" className="navLink">Home</Link>
        <Link to="/proyectos" className="navLink">Proyectos</Link>
        <Link to="/sobre-mi" className="navLink">Sobre mí</Link>
        <Link to="/estados" className="navLink">Estados</Link>
        <button className="button">Contacto</button>
      </nav>
    </header>
  );
}

export default Header;