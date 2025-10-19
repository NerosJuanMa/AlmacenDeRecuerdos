import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
        <div className="footer-section">
          <h3 className="footer-title">Almacén de recuerdos</h3>
          <h5 className="footer-description">
            <br />Un lugar donde encontrarás recuerdos con historias increíbles.
          </h5>
        </div>      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Almacén de recuerdos. Hecho con ❤️
        </p>
      </div>
    </footer>
  );
}

export default Footer;