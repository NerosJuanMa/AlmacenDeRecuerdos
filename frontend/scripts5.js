// Config
const API_URL = 'http://localhost:4000/api';

/* ---------- Utilities ---------- */
function toast(msg, bg = null) {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: bg || getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#5b76ff' }
  }).showToast();
}

/* ---------- DOM elements ---------- */
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');

const confirmModal = document.getElementById('confirm-modal');
const confirmText = document.getElementById('confirm-text');
const confirmCancel = document.getElementById('confirm-cancel');
const confirmAccept = document.getElementById('confirm-accept');

const tbodyArt = document.getElementById('tbody-articulos');
const tbodyCat = document.getElementById('tbody-categorias');
const tbodyAlm = document.getElementById('tbody-almacen');

const searchArt = document.getElementById('search-articulos');
const searchCat = document.getElementById('search-categorias');
const searchAlm = document.getElementById('search-almacen');

/* Modal helpers */
modalClose.onclick = () => closeModal();
function openModal(title, fields = [], onSubmit) {
  modalTitle.textContent = title;
  modalForm.innerHTML = '';
  fields.forEach(f => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <label for="${f.id}">${f.label}</label>
      ${f.type === 'textarea'
        ? `<textarea id="${f.id}" placeholder="${f.placeholder || ''}">${f.value ?? ''}</textarea>`
        : `<input id="${f.id}" type="${f.type}" value="${f.value ?? ''}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''} />`
      }
    `;
    modalForm.appendChild(wrapper);
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn';
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Guardar';
  modalForm.appendChild(submitBtn);

  modalForm.onsubmit = async e => {
    e.preventDefault();
    try {
      await onSubmit();
    } catch (err) {
      toast('Error: ' + (err.message || err), '#ea5455');
      return;
    }
    closeModal();
  };

  modal.classList.remove('hidden');
}
function closeModal() {
  modal.classList.add('hidden');
  modalForm.onsubmit = null;
}

/* Confirm modal */
let _confirmResolve = null;
function openConfirm(text = '¿Estás seguro?') {
  confirmText.textContent = text;
  confirmModal.classList.remove('hidden');

  return new Promise((resolve) => {
    _confirmResolve = resolve;
  });
}
confirmCancel.onclick = () => {
  confirmModal.classList.add('hidden');
  if (_confirmResolve) _confirmResolve(false);
};
confirmAccept.onclick = () => {
  confirmModal.classList.add('hidden');
  if (_confirmResolve) _confirmResolve(true);
};

/* ---------- Dark mode toggle ---------- */
const darkToggle = document.getElementById('dark-toggle');
if (localStorage.getItem('dark') === '1') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}
darkToggle.onchange = () => {
  if (darkToggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('dark', '1');
  } else {
    document.body.classList.remove('dark');
    localStorage.removeItem('dark');
  }
};

/* ---------- NAV ---------- */
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

document.getElementById('refresh-all').onclick = () => {
  listarArticulos();
  listarCategorias();
  listarAlmacen();
  toast('Datos actualizados');
};

/* ---------- STATE (cached arrays) ---------- */
let ARTICULOS = [];
let CATEGORIAS = [];
let ALMACEN = [];

/* ---------- ARTÍCULOS ---------- */
async function listarArticulos() {
  tbodyArt.innerHTML = `<tr><td colspan="9">Cargando...</td></tr>`;
  try {
    const res = await fetch(`${API_URL}/articulos`);
    const json = await res.json();
    ARTICULOS = json.data || [];
    renderArticulos();
  } catch (err) {
    tbodyArt.innerHTML = `<tr><td colspan="9">❌ Error</td></tr>`;
    toast('Error al cargar artículos', '#ea5455');
  }
}

function renderArticulos() {
  const q = (searchArt.value || '').toLowerCase().trim();
  const filtered = ARTICULOS.filter(a => {
    if (!q) return true;
    return (
      String(a.nombre || '').toLowerCase().includes(q) ||
      String(a.color || '').toLowerCase().includes(q) ||
      String(a.estado || '').toLowerCase().includes(q) ||
      String(a.historia_procedencia || '').toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) {
    tbodyArt.innerHTML = `<tr><td colspan="9">📭 No hay artículos</td></tr>`;
    return;
  }

  tbodyArt.innerHTML = filtered.map(a => `
    <tr>
      <td>${escapeHtml(a.nombre)}</td>
      <td>${a.precio ?? ''}</td>
      <td>${escapeHtml(a.tamaño ?? '')}</td>
      <td>${escapeHtml(a.color ?? '')}</td>
      <td>${a.imagen ? `<a href="${a.imagen}" target="_blank">ver</a>` : ''}</td>
      <td>${escapeHtml(a.historia_procedencia ?? '')}</td>
      <td>${a.disponibilidad ? '✔️' : '❌'}</td>
      <td>${escapeHtml(a.estado ?? '')}</td>
      <td>
        <button class="btn edit" onclick='handleEditArticulo("${a._id}")'>✏️</button>
        <button class="btn delete" onclick='handleDeleteArticulo("${a._id}")'>🗑️</button>
      </td>
    </tr>
  `).join('');
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.getElementById('btn-add-articulo').onclick = () => {
  openModal('Añadir artículo', [
    { id: 'nombre', label: 'Nombre', type: 'text', required: true },
    { id: 'precio', label: 'Precio', type: 'number' },
    { id: 'tamaño', label: 'Tamaño', type: 'text' },
    { id: 'color', label: 'Color', type: 'text' },
    { id: 'imagen', label: 'URL imagen', type: 'text' },
    { id: 'historia', label: 'Historia / procedencia', type: 'textarea' },
    { id: 'disponibilidad', label: 'Disponible (true/false)', type: 'text', placeholder: 'true' },
    { id: 'estado', label: 'Estado', type: 'text' }
  ], async () => {
    const body = {
      nombre: document.getElementById('nombre').value,
      precio: parseFloat(document.getElementById('precio').value) || 0,
      tamaño: document.getElementById('tamaño').value,
      color: document.getElementById('color').value,
      imagen: document.getElementById('imagen').value,
      historia_procedencia: document.getElementById('historia').value,
      disponibilidad: document.getElementById('disponibilidad').value === 'true',
      estado: document.getElementById('estado').value
    };
    await fetch(`${API_URL}/articulos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    toast('Artículo creado', '#28c76f');
    await listarArticulos();
  });
};

window.handleEditArticulo = async (id) => {
  const a = ARTICULOS.find(x => x._id === id);
  if (!a) return toast('Artículo no encontrado', '#ea5455');

  openModal('Editar artículo', [
    { id: 'nombre', label: 'Nombre', type: 'text', value: a.nombre, required: true },
    { id: 'precio', label: 'Precio', type: 'number', value: a.precio },
    { id: 'tamaño', label: 'Tamaño', type: 'text', value: a.tamaño },
    { id: 'color', label: 'Color', type: 'text', value: a.color },
    { id: 'imagen', label: 'URL imagen', type: 'text', value: a.imagen },
    { id: 'historia', label: 'Historia / procedencia', type: 'textarea', value: a.historia_procedencia },
    { id: 'disponibilidad', label: 'Disponible (true/false)', type: 'text', value: a.disponibilidad ? 'true' : 'false' },
    { id: 'estado', label: 'Estado', type: 'text', value: a.estado }
  ], async () => {
    const body = {
      nombre: document.getElementById('nombre').value,
      precio: parseFloat(document.getElementById('precio').value) || 0,
      tamaño: document.getElementById('tamaño').value,
      color: document.getElementById('color').value,
      imagen: document.getElementById('imagen').value,
      historia_procedencia: document.getElementById('historia').value,
      disponibilidad: document.getElementById('disponibilidad').value === 'true',
      estado: document.getElementById('estado').value
    };
    await fetch(`${API_URL}/articulos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    toast('Artículo actualizado', '#ff9f43');
    await listarArticulos();
  });
};

window.handleDeleteArticulo = async (id) => {
  const ok = await openConfirm('Eliminar artículo permanentemente?');
  if (!ok) return toast('Cancelado', '#9aa4b2');
  await fetch(`${API_URL}/articulos/${id}`, { method: 'DELETE' });
  toast('Artículo eliminado', '#ea5455');
  await listarArticulos();
};

/* ---------- CATEGORÍAS ---------- */
async function listarCategorias() {
  tbodyCat.innerHTML = `<tr><td colspan="2">Cargando...</td></tr>`;
  try {
    const res = await fetch(`${API_URL}/categorias`);
    const json = await res.json();
    CATEGORIAS = json.data || [];
    renderCategorias();
  } catch {
    tbodyCat.innerHTML = `<tr><td colspan="2">❌ Error</td></tr>`;
    toast('Error al cargar categorías', '#ea5455');
  }
}

function renderCategorias() {
  const q = (searchCat.value || '').toLowerCase().trim();
  const filtered = CATEGORIAS.filter(c => !q || String(c.nombre || '').toLowerCase().includes(q));
  if (!filtered.length) {
    tbodyCat.innerHTML = `<tr><td colspan="2">📭 No hay categorías</td></tr>`;
    return;
  }
  tbodyCat.innerHTML = filtered.map(c => `
    <tr>
      <td>${escapeHtml(c.nombre)}</td>
      <td>
        <button class="btn delete" onclick='handleDeleteCategoria("${c._id}")'>🗑️</button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('btn-add-cat').onclick = () => {
  openModal('Añadir categoría', [
    { id: 'nombreCat', label: 'Nombre', type: 'text', required: true }
  ], async () => {
    await fetch(`${API_URL}/categorias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: document.getElementById('nombreCat').value })
    });
    toast('Categoría creada', '#28c76f');
    await listarCategorias();
  });
};

window.handleDeleteCategoria = async (id) => {
  const ok = await openConfirm('Eliminar categoría? Esto puede afectar referencias.');
  if (!ok) return toast('Cancelado', '#9aa4b2');
  await fetch(`${API_URL}/categorias/${id}`, { method: 'DELETE' });
  toast('Categoría eliminada', '#ea5455');
  await listarCategorias();
};

/* ---------- ALMACÉN ---------- */
async function listarAlmacen() {
  tbodyAlm.innerHTML = `<tr><td colspan="5">Cargando...</td></tr>`;
  try {
    const res = await fetch(`${API_URL}/almacen`);
    const json = await res.json();
    ALMACEN = json.data || [];
    renderAlmacen();
  } catch {
    tbodyAlm.innerHTML = `<tr><td colspan="5">❌ Error</td></tr>`;
    toast('Error al cargar almacén', '#ea5455');
  }
}

function renderAlmacen() {
  const q = (searchAlm.value || '').toLowerCase().trim();
  const filtered = ALMACEN.filter(i => {
    if (!q) return true;
    return (
      String(i.articuloId || '').toLowerCase().includes(q) ||
      String(i.categoriaId || '').toLowerCase().includes(q) ||
      String(i.ubicacion || '').toLowerCase().includes(q)
    );
  });

  if (!filtered.length) {
    tbodyAlm.innerHTML = `<tr><td colspan="5">📭 No hay registros</td></tr>`;
    return;
  }

  tbodyAlm.innerHTML = filtered.map(a => `
    <tr>
      <td>${escapeHtml(a.articuloId)}</td>
      <td>${escapeHtml(a.categoriaId)}</td>
      <td>${a.stock}</td>
      <td>${escapeHtml(a.ubicacion || '')}</td>
      <td>
        <button class="btn delete" onclick='handleDeleteAlmacen("${a._id}")'>🗑️</button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('btn-add-almacen').onclick = () => {
  openModal('Añadir a almacén', [
    { id: 'artId', label: 'ID Artículo', type: 'text', required: true },
    { id: 'catId', label: 'ID Categoría', type: 'text', required: true },
    { id: 'stock', label: 'Stock', type: 'number', value: 1 },
    { id: 'ubi', label: 'Ubicación', type: 'text' }
  ], async () => {
    await fetch(`${API_URL}/almacen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articuloId: document.getElementById('artId').value,
        categoriaId: document.getElementById('catId').value,
        stock: parseInt(document.getElementById('stock').value, 10) || 0,
        ubicacion: document.getElementById('ubi').value
      })
    });
    toast('Entrada añadida', '#28c76f');
    await listarAlmacen();
  });
};

window.handleDeleteAlmacen = async (id) => {
  const ok = await openConfirm('Eliminar entrada del almacén?');
  if (!ok) return toast('Cancelado', '#9aa4b2');
  await fetch(`${API_URL}/almacen/${id}`, { method: 'DELETE' });
  toast('Entrada eliminada', '#ea5455');
  await listarAlmacen();
};

/* ---------- SEARCH events ---------- */
searchArt.addEventListener('input', () => renderArticulos());
searchCat.addEventListener('input', () => renderCategorias());
searchAlm.addEventListener('input', () => renderAlmacen());

document.getElementById('btn-clear-filters-art').onclick = () => { searchArt.value = ''; renderArticulos(); };
document.getElementById('btn-clear-filters-cat').onclick = () => { searchCat.value = ''; renderCategorias(); };
document.getElementById('btn-clear-filters-alm').onclick = () => { searchAlm.value = ''; renderAlmacen(); };

/* ---------- Init ---------- */
(async function init(){
  await listarArticulos();
  await listarCategorias();
  await listarAlmacen();
})();
