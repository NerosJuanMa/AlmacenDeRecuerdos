import './Tarjeta.css';

    // Componente Tarjeta: recibe props para personalizar cada tarjeta
    function Tarjeta({ titulo, descripcion, imagen, textoBoton, color, colorFondo }) {
      return (
        // Contenedor principal de la tarjeta
        // borderLeftColor y backgroundColor se personalizan con props
        <div 
      className="tarjeta" 
      style={{ 
        borderLeftColor: color,              // Color del borde izquierdo
        backgroundColor: colorFondo || '#ffffff' // Fondo personalizado o blanco por defecto
      }}
        >
      {/* Renderiza la imagen solo si la prop 'imagen' existe */}
      {imagen && (
        <div className="tarjeta-imagen">
          <img src={imagen} alt={titulo} /> {/* alt mejora accesibilidad */}
        </div>
      )}
      
      {/* Contenido principal de la tarjeta */}
      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{titulo}</h3> {/* Título dinámico */}
        <p className="tarjeta-descripcion">{descripcion}</p> {/* Descripción dinámica */}
        
        {/* Renderiza el botón solo si la prop 'textoBoton' existe */}
        {textoBoton && (
          <button 
        className="tarjeta-boton" 
        style={{ backgroundColor: color }} // Color del botón igual al borde
          >
        {textoBoton} {/* Texto del botón personalizado */}
          </button>
        )}
      </div>
        </div>
      );
    }

    export default Tarjeta; // Exporta el componente para usarlo en otras partes