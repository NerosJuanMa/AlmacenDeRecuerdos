const API_URL = 'http://localhost:4000/api';

// Navegación
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.id.replace('tab-', '')).classList.add('active');
  });
});

// ===================== ARTÍCULOS ====================

async function listarArticulos() {
  const tbody = document.querySelector('#tabla-articulos tbody');

  tbody.innerHTML = `
    <tr><td colspan="9">Cargando...</td></tr>
  `;

  try {
    const res = await fetch(`${API_URL}/articulos`);
    const json = await res.json();
    const articulos = json.data; // <- ESTA ES LA CLAVE

    if (!Array.isArray(articulos) || articulos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9">📭 No hay artículos</td></tr>`;
      return;
    }

    tbody.innerHTML = articulos.map(a => `
      <tr>
        <td>${a.nombre}</td>
        <td>${a.precio || ''}</td>
        <td>${a.tamaño || ''}</td>
        <td>${a.color || ''}</td>
        <td>${a.imagen || ''}</td>
        <td>${a.historia_procedencia || ''}</td>
        <td>${a.disponibilidad ? 'Sí' : 'No'}</td>
        <td>${a.estado || ''}</td>
        <td><button onclick="eliminarArticulo('${a._id}')">🗑️</button></td>
      </tr>
    `).join('');

  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="9">❌ ${error.message}</td></tr>`;
  }}
async function eliminarArticulo(id) {
  await fetch(`${API_URL}/articulos/${id}`, { method: 'DELETE' });
  listarArticulos();
}

// ===================== CATEGORÍAS =====================
async function listarCategorias() {
  const tbody = document.querySelector('#tabla-categorias tbody');

  tbody.innerHTML = `<tr><td colspan="2">Cargando...</td></tr>`;

  try {
    const res = await fetch(`${API_URL}/categorias`);
    const json = await res.json();
    const categorias = json.data;

    if (!Array.isArray(categorias) || categorias.length === 0) {
      tbody.innerHTML = `<tr><td colspan="2">📭 No hay categorías.</td></tr>`;
      return;
    }

    tbody.innerHTML = categorias.map(c => `
      <tr>
        <td>${c.nombre}</td>
        <td><button onclick="eliminarCategoria('${c._id}')">🗑️</button></td>
      </tr>
    `).join('');

  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="2">❌ ${error.message}</td></tr>`;
  }
}

document.querySelector('#form-categoria').addEventListener('submit', async e => {
  e.preventDefault();

  await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombreCat.value
    })
  });

  e.target.reset();
  listarCategorias();
});

async function eliminarCategoria(id) {
  await fetch(`${API_URL}/categorias/${id}`, { method: 'DELETE' });
  listarCategorias();
}


// ===================== ALMACÉN =====================
async function listarAlmacen() {
  const tbody = document.querySelector('#tabla-almacen tbody');

  tbody.innerHTML = `<tr><td colspan="5">Cargando...</td></tr>`;

  try {
    const res = await fetch(`${API_URL}/almacen`);
    const json = await res.json();
    const items = json.data;

    if (!Array.isArray(items) || items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">📭 No hay registros.</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(a => `
      <tr>
        <td>${a.articuloId}</td>
        <td>${a.categoriaId}</td>
        <td>${a.stock}</td>
        <td>${a.ubicacion || ''}</td>
        <td><button onclick="eliminarAlmacen('${a._id}')">🗑️</button></td>
      </tr>
    `).join('');

  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="5">❌ ${error.message}</td></tr>`;
  }
}

document.querySelector('#form-almacen').addEventListener('submit', async e => {
  e.preventDefault();

  await fetch(`${API_URL}/almacen`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      articuloId: articuloId.value,
      categoriaId: categoriaId.value,
      stock: stock.value,
      ubicacion: ubicacion.value
    })
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
