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
      console.log('Error al obtener artículos del servidor', 'error');
    }

  } catch (error) {
    console.error('❌ Error al obtener artículos:', error);
    console.log('No se puede conectar con el servidor', 'error');
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
            <td>${a.imagen || ''}</td>
            <td>${a.historia_procedencia || ''}</td>
            <td>${a.disponibilidad || ''}</td>
            <td>${a.estado || ''}</td>
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
    color: color.value,
    imagen: imagen.value,
    historia_procedencia: historia_procedencia.value,
    disponibilidad: disponibilidad.value,
    estado: estado.value
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
  try {
    const res = await fetch(`${API_URL}/categorias`);
    const datos = await res.json();

    if (datos.exito) {
      mostrarCategoriasEnPantalla(datos.datos);
    } else {
      console.log('Error al obtener categorias del servidor', 'error');
    }

  } catch (error) {
    console.error('❌ Error al obtener categorias:', error);
    console.log('No se puede conectar con el servidor', 'error');
  }
}


function mostrarCategoriasEnPantalla(categorias) {
  console.log(`📦 Mostrando ${categorias.length} categorias en pantalla`);

  if (categorias.length === 0) {
    tablaCategorias.innerHTML = `
            <tr><td colspan="5" class="vacio">No hay categorias. ¡Agrega el primero!</td></tr>
        `;
    return;
  }

  const html = categorias.map(a => `
        <tr data-id="${a._id}">
            <td>${a.nombre}</td>
            <td>${a.imagen}</td>
            <td>
                <button onclick="prepararEdicion('${a._id}')" class="btn-editar">✏️</button>
                <button onclick="preguntarSiEliminar('${a._id}', '${a.nombre}')" class="btn-eliminar">🗑️</button>
            </td>
        </tr>
    `).join('');

  tablaCategorias.innerHTML = html;
}

document.querySelector('#form-categoria').addEventListener('submit', async e => {
  e.preventDefault();
  await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: nombre.value, imagen: imagen.value })
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
  try {
    const res = await fetch(`${API_URL}/almacen`);
    const datos = await res.json();

    if (datos.exito) {
      mostrarAlmacenEnPantalla(datos.datos);
    } else {
      console.log('Error al obtener almacen del servidor', 'error');
    }

  } catch (error) {
    console.error('❌ Error al obtener almacen:', error);
    console.log('No se puede conectar con el servidor', 'error');
  }
}


function mostrarAlmacenEnPantalla(almacen) {
  console.log(`📦 Mostrando ${almacen.length} almacen en pantalla`);

  if (almacen.length === 0) {
    tablaAlmacen.innerHTML = `
            <tr><td colspan="5" class="vacio">No hay almacen. ¡Agrega el primero!</td></tr>
        `;
    return;
  }

  const html = almacen.map(a => `
        <tr data-id="${a._id}">
            <td>${a.nombre}</td>
            <td>${a.imagen}</td>
            <td>
                <button onclick="prepararEdicion('${a._id}')" class="btn-editar">✏️</button>
                <button onclick="preguntarSiEliminar('${a._id}', '${a.nombre}')" class="btn-eliminar">🗑️</button>
            </td>
        </tr>
    `).join('');

  tablaCategorias.innerHTML = html;
}
document.querySelector('#form-almacen').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    nombre: nombre.value,
    precio: parseFloat(precio.value),
    tamaño: tamaño.value,
    color: color.value,
    imagen: imagen.value,
    historia_procedencia: historia_procedencia.value,
    disponibilidad: disponibilidad.value,
    estado: estado.value
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