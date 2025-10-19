

import Header from "../components/Header";
import Footer from "../components/Footer";
import Tarjeta from "../components/Tarjeta";
import "./Proyectos.css";

function Proyectos() {
  // 🧬 Array con 9 noticias fascinantes de ciencia y tecnología
  const noticias = [
    {
      id: 1,
      titulo: "🧬 CRISPR cura diabetes tipo 1",
      descripcion: "Primera paciente curada completamente de diabetes mediante edición genética CRISPR-Cas9, revolucionando el tratamiento de enfermedades autoinmunes",
      imagen: "/images/imagen2.png",
      textoBoton: "Leer estudio",
      color: "#27ae60",
      colorFondo: "#e8f8f5"
    },
    {
      id: 2,
      titulo: "🚀 James Webb descubre galaxias imposibles",
      descripcion: "El telescopio espacial detecta galaxias maduras que existían solo 400 millones de años después del Big Bang, desafiando las teorías actuales",
      imagen: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=150&h=150&fit=crop",
      textoBoton: "Ver imágenes",
      color: "#8e44ad",
      colorFondo: "#f4f0f7"
    },
    {
      id: 3,
      titulo: "🤖 IA detecta cáncer antes que médicos",
      descripcion: "Sistema de IA de Google identifica cáncer de mama con 99.2% de precisión, superando a radiólogos expertos en diagnósticos tempranos",
      imagen: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150&h=150&fit=crop",
      textoBoton: "Ver demo",
      color: "#e74c3c",
      colorFondo: "#fdf2f2"
    },
    {
      id: 4,
      titulo: "🧠 Neuralink restaura la vista",
      descripcion: "Primer paciente ciego recupera visión parcial gracias a implante cerebral que conecta directamente con la corteza visual",
      imagen: "https://images.unsplash.com/photo-1559757172-d87ebfb725df?w=150&h=150&fit=crop",
      textoBoton: "Conocer más",
      color: "#3498db",
      colorFondo: "#ebf3fd"
    },
    {
      id: 5,
      titulo: "🌍 Fusión nuclear logra ganancia energética",
      descripcion: "Laboratorio de Lawrence Livermore produce más energía de la que consume en reacción de fusión, marcando hito histórico para energía limpia",
      imagen: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=150&fit=crop",
      textoBoton: "Ver experimento",
      color: "#f39c12",
      colorFondo: "#fef9e7"
    },
    {
      id: 6,
      titulo: "📚 ChatGPT personalizado para cada estudiante",
      descripcion: "IA educativa se adapta al ritmo y estilo de aprendizaje individual, mejorando comprensión en matemáticas y ciencias hasta 40%",
      imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&h=150&fit=crop",
      textoBoton: "Probar gratis",
      color: "#9b59b6",
      colorFondo: "#f8f4fd"
    },
    {
      id: 7,
      titulo: "🪐 Agua líquida confirmada en Europa",
      descripcion: "La luna de Júpiter tiene océanos subterráneos con más agua que todos los océanos terrestres, aumentando posibilidades de vida extraterrestre",
      imagen: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=150&h=150&fit=crop",
      textoBoton: "Explorar",
      color: "#1abc9c",
      colorFondo: "#e8fcf7"
    },
    {
      id: 8,
      titulo: "💊 Pastilla que revierte el envejecimiento",
      descripcion: "Ensayos clínicos muestran que NAD+ sintético revierte marcadores de edad a nivel celular, extendiendo longevidad en ratones 30%",
      imagen: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop",
      textoBoton: "Ver resultados",
      color: "#e67e22",
      colorFondo: "#fef4e6"
    },
    {
      id: 9,
      titulo: "⚡ Computadoras cuánticas descifran proteínas",
      descripcion: "IBM y Google usan qubits para simular plegamiento de proteínas, acelerando desarrollo de medicamentos contra Alzheimer y Parkinson",
      imagen: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=150&h=150&fit=crop",
      textoBoton: "Descubrir",
      color: "#34495e",
      colorFondo: "#f8f9fa",
      claseEspecial: "tarjeta-destacada"
    }
  ];

  return (
    <div>
      <Header />
      
      <main>
        <div className="proyectos-hero">
          <h1>🧬 Avances Científicos Revolucionarios</h1>
          <p>Descubre los 9 avances más impactantes en tecnología, medicina, astronomía e IA que están cambiando nuestro mundo</p>
        </div>

        <div className="proyectos-container">
          {/* 🔥 MAPEO DINÁMICO - 9 noticias científicas fascinantes */}
          <div className="tarjetas-container">
            {noticias.map(noticia => (
              <div 
                key={noticia.id}
                className={`proyecto-item ${noticia.claseEspecial || ''}`}
              >
                <Tarjeta
                  titulo={noticia.titulo}
                  descripcion={noticia.descripcion}
                  imagen={noticia.imagen}
                  textoBoton={noticia.textoBoton}
                  color={noticia.color}
                  colorFondo={noticia.colorFondo}
                />
              </div>
            ))}
          </div>

          <div className="proyectos-stats">
            <h2>📊 Impacto Científico Global</h2>
            <div className="stats-grid">
              <div className="stat">
                <span className="numero">{noticias.length}</span>
                <span className="texto">Avances revolucionarios</span>
              </div>
              <div className="stat">
                <span className="numero">5</span>
                <span className="texto">Áreas de investigación</span>
              </div>
              <div className="stat">
                <span className="numero">∞</span>
                <span className="texto">Posibilidades futuras</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Proyectos;