import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Mi Portafolio</h3>
          <p className="footer-description">
            Desarrollador web apasionado por crear experiencias digitales increíbles.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><a href="#inicio" className="footer-link">Inicio</a></li>
            <li><a href="#proyectos" className="footer-link">Proyectos</a></li>
            <li><a href="#sobre-mi" className="footer-link">Sobre mí</a></li>
            <li><a href="#contacto" className="footer-link">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Sígueme</h4>
          <div className="footer-social">
            <a href="#" className="footer-social-link">GitHub</a>
            <a href="#" className="footer-social-link">LinkedIn</a>
            <a href="#" className="footer-social-link">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Mi Portafolio. Hecho con ❤️ y React.
        </p>
      </div>
    </footer>
  );
}

export default Footer;