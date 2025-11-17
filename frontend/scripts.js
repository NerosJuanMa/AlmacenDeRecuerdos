const API_URL = 'http://localhost:4000/api';

    // Navegación entre secciones
    document.querySelectorAll('nav button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.id.replace('tab-', '')).classList.add('active');
      });
    });

    // ===================== ARTÍCULOS =====================

  
    const tablaArticulos = document.getElementById('tabla-articulos');

async function listarArticulos() {
    try {
        const res = await fetch(`${API_URL}/articulos`);
        const datos = await res.json(); 
        
        if (datos.exito) {
            mostrarArticulosEnPantalla(datos.datos);
        } else {
            mostrarMensaje('Error al obtener artículos del servidor', 'error');
        }

    } catch (error) {
        console.error('❌ Error al obtener artículos:', error);
        mostrarMensaje('No se puede conectar con el servidor', 'error');
    }
}

function mostrarArticulosEnPantalla(articulos) {
    console.log(`📦 Mostrando ${articulos.length} artículos en pantalla`);

    if (articulos.length === 0) {
        tablaArticulos.innerHTML = `
            <tr><td colspan="5" class="vacio">No hay artículos. ¡Agrega el primero!</td></tr>
        `;
        return;
    }

    const html = articulos.map(a => `
        <tr data-id="${a._id}">
            <td>${a.nombre}</td>
            <td>${a.precio || ''}</td>
            <td>${a.tamaño || ''}</td>
            <td>${a.color || ''}</td>
            <td>
                <button onclick="prepararEdicion('${a._id}')" class="btn-editar">✏️</button>
                <button onclick="preguntarSiEliminar('${a._id}', '${a.nombre}')" class="btn-eliminar">🗑️</button>
            </td>
        </tr>
    `).join('');

    tablaArticulos.innerHTML = html;
}

// Llama a listarArticulos() después de cargar la página
document.addEventListener("DOMContentLoaded", listarArticulos);



    document.querySelector('#form-articulo').addEventListener('submit', async e => {
      e.preventDefault();
      const data = {
        nombre: nombre.value,
        precio: parseFloat(precio.value),
        tamaño: tamaño.value,
        color: color.value
      };
      await fetch(`${API_URL}/articulos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      e.target.reset();
      listarArticulos();
    });

    async function eliminarArticulo(id) {
      await fetch(`${API_URL}/articulos/${id}`, { method: 'DELETE' });
      listarArticulos();
    }

    // ===================== CATEGORÍAS =====================
    const tablaCategorias = document.querySelector('#tabla-categorias tbody');
    async function listarCategorias() {
      const res = await fetch(`${API_URL}/categorias`);
      const datos = await res.json();
      tablaCategorias.innerHTML = datos.map(c => `
        <tr>
          <td>${c.nombre}</td>
          <td><button onclick="eliminarCategoria('${c._id}')" class='delete'>🗑</button></td>
        </tr>`).join('');
    }

    document.querySelector('#form-categoria').addEventListener('submit', async e => {
      e.preventDefault();
      await fetch(`${API_URL}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreCat.value })
      });
      e.target.reset();
      listarCategorias();
    });

    async function eliminarCategoria(id) {
      await fetch(`${API_URL}/categorias/${id}`, { method: 'DELETE' });
      listarCategorias();
    }

    // ===================== ALMACÉN =====================
    const tablaAlmacen = document.querySelector('#tabla-almacen tbody');
    async function listarAlmacen() {
      const res = await fetch(`${API_URL}/almacen`);
      const datos = await res.json();
      tablaAlmacen.innerHTML = datos.map(r => `
        <tr>
          <td>${r.articulo_id}</td>
          <td>${r.categoria_id}</td>
          <td>${r.stock}</td>
          <td>${r.ubicacion}</td>
          <td><button onclick="eliminarAlmacen('${r._id}')" class='delete'>🗑</button></td>
        </tr>`).join('');
    }

    document.querySelector('#form-almacen').addEventListener('submit', async e => {
      e.preventDefault();
      const data = {
        articulo_id: articuloId.value,
        categoria_id: categoriaId.value,
        stock: parseInt(stock.value),
        ubicacion: ubicacion.value
      };
      await fetch(`${API_URL}/almacen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      e.target.reset();
      listarAlmacen();
    });

    async function eliminarAlmacen(id) {
      await fetch(`${API_URL}/almacen/${id}`, { method: 'DELETE' });
      listarAlmacen();
    }

    // Inicializar
    listarArticulos();
    listarCategorias();
    listarAlmacen();