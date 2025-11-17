// La URL base de tu API de backend.
// ¡AJUSTA ESTO SI TU BACKEND NO ESTÁ EN EL PUERTO 4000!
const API_URL = 'http://localhost:4000/api/';

const recuerdosList = document.getElementById('recuerdos-list');
const recuerdoForm = document.getElementById('recuerdo-form');
const loadingMessage = document.getElementById('loading-message');

/**
 * Muestra un solo recuerdo en la lista.
 * @param {object} recuerdo - Objeto con { _id, titulo, contenido }
 */
function displayRecuerdo(recuerdo) {
    const card = document.createElement('div');
    card.className = 'recuerdo-card';
    card.innerHTML = `
        <h3>${recuerdo.titulo}</h3>
        <p>${recuerdo.contenido}</p>
        `;
    recuerdosList.prepend(card); // Agrega el más nuevo al principio
}

/**
 * Obtiene y muestra todos los recuerdos del backend.
 */
async function fetchRecuerdos() {
    recuerdosList.innerHTML = ''; // Limpia la lista
    loadingMessage.textContent = 'Cargando recuerdos...';

    try {
        const response = await fetch(`${API_URL}/articulos`);
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.status}`);
        }
        const recuerdos = await response.json();

        if (recuerdos.length === 0) {
            loadingMessage.textContent = 'Aún no tienes recuerdos guardados.';
        } else {
            loadingMessage.style.display = 'none'; // Oculta el mensaje
            // Asegúrate de que el array esté bien anidado si el backend lo devuelve con una clave
            const recuerdosArray = recuerdos.recuerdos || recuerdos;
            recuerdosArray.reverse().forEach(displayRecuerdo);
        }

    } catch (error) {
        console.error('Error al obtener los recuerdos:', error);
        loadingMessage.textContent = '❌ Error al cargar los recuerdos. Asegúrate de que el backend esté corriendo.';
    }
}

/**
 * Maneja el envío del formulario para crear un nuevo recuerdo.
 */
recuerdoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    const nuevoRecuerdo = {
        titulo: titulo,
        contenido: contenido // Ajusta las claves según tu modelo de Mongoose si son diferentes (ej: 'cuerpo')
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoRecuerdo),
        });

        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.statusText}`);
        }

        const recuerdoGuardado = await response.json();
        
        // Muestra el nuevo recuerdo y limpia el formulario
        // Asumiendo que el backend devuelve el objeto creado, si no, usa el objeto local 'nuevoRecuerdo'
        displayRecuerdo(recuerdoGuardado.recuerdo || nuevoRecuerdo); 
        recuerdoForm.reset();
        alert('Recuerdo guardado con éxito!');

    } catch (error) {
        console.error('Error al guardar el recuerdo:', error);
        alert('Hubo un error al guardar el recuerdo. Revisa la consola y el estado del backend.');
    }
});

// Inicializa la carga de recuerdos al cargar la página
document.addEventListener('DOMContentLoaded', fetchRecuerdos);