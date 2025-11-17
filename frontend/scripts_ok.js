const API_URL = "http://localhost:4000/api";

/* ---------------------- UTILITIES ---------------------- */

function toast(msg, color = "#5b76ff") {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: color
  }).showToast();
}

const modal = document.getElementById("modal");
const modalForm = document.getElementById("modal-form");
const modalTitle = document.getElementById("modal-title");
document.getElementById("modal-close").onclick = () => modal.classList.add("hidden");

function openModal(title, fields, onSubmit) {
  modalTitle.textContent = title;
  modalForm.innerHTML = "";
  modal.classList.remove("hidden");

  fields.forEach(f => {
    modalForm.innerHTML += `
      <label>${f.label}</label>
      <input type="${f.type}" id="${f.id}" value="${f.value ?? ""}" required>
    `;
  });

  modalForm.innerHTML += `<button class="btn add" type="submit">Guardar</button>`;

  modalForm.onsubmit = async e => {
    e.preventDefault();
    await onSubmit();
    modal.classList.add("hidden");
  };
}

/* ---------------------- NAVIGATION ---------------------- */
document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

/* ---------------------- ARTÍCULOS CRUD ---------------------- */

async function listarArticulos() {
  const tbody = document.getElementById("tbody-articulos");

  tbody.innerHTML = `<tr><td colspan="9">Cargando...</td></tr>`;

  try {
    const res = await fetch(`${API_URL}/articulos`);
    const json = await res.json();
    const data = json.data;

    tbody.innerHTML = data.map(a => `
      <tr>
        <td>${a.nombre}</td>
        <td>${a.precio}</td>
        <td>${a.tamaño}</td>
        <td>${a.color}</td>
        <td>${a.imagen}</td>
        <td>${a.historia_procedencia}</td>
        <td>${a.disponibilidad ? "Sí" : "No"}</td>
        <td>${a.estado}</td>
        <td>
          <button class="btn edit" onclick='editarArticulo(${JSON.stringify(a)})'>✏️</button>
          <button class="btn delete" onclick="eliminarArticulo('${a._id}')">🗑️</button>
        </td>
      </tr>
    `).join("");

  } catch (error) {
    toast("Error cargando artículos", "#ea5455");
  }
}

document.getElementById("btn-add-articulo").onclick = () => {
  openModal("Añadir Artículo", [
    { label: "Nombre", id: "nombre", type: "text" },
    { label: "Precio", id: "precio", type: "number" },
    { label: "Tamaño", id: "tamaño", type: "text" },
    { label: "Color", id: "color", type: "text" },
    { label: "Imagen", id: "imagen", type: "text" },
    { label: "Historia", id: "historia", type: "text" },
    { label: "Disponible (true/false)", id: "disp", type: "text" },
    { label: "Estado", id: "estado", type: "text" }
  ], async () => {
    await fetch(`${API_URL}/articulos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre.value,
        precio: precio.value,
        tamaño: tamaño.value,
        color: color.value,
        imagen: imagen.value,
        historia_procedencia: historia.value,
        disponibilidad: disp.value === "true",
        estado: estado.value
      })
    });

    toast("Artículo añadido");
    listarArticulos();
  });
};

function editarArticulo(a) {
  openModal("Editar Artículo", [
    { label: "Nombre", id: "nombre", type: "text", value: a.nombre },
    { label: "Precio", id: "precio", type: "number", value: a.precio },
    { label: "Tamaño", id: "tamaño", type: "text", value: a.tamaño },
    { label: "Color", id: "color", type: "text", value: a.color },
    { label: "Imagen", id: "imagen", type: "text", value: a.imagen },
    { label: "Historia", id: "historia", type: "text", value: a.historia_procedencia },
    { label: "Disponible", id: "disp", type: "text", value: a.disponibilidad },
    { label: "Estado", id: "estado", type: "text", value: a.estado }
  ], async () => {
    await fetch(`${API_URL}/articulos/${a._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre.value,
        precio: precio.value,
        tamaño: tamaño.value,
        color: color.value,
        imagen: imagen.value,
        historia_procedencia: historia.value,
        disponibilidad: disp.value === "true",
        estado: estado.value
      })
    });

    toast("Artículo actualizado", "#ff9f43");
    listarArticulos();
  });
}

async function eliminarArticulo(id) {
  await fetch(`${API_URL}/articulos/${id}`, { method: "DELETE" });
  toast("Artículo eliminado", "#ea5455");
  listarArticulos();
}

/* ---------------------- CATEGORÍAS ---------------------- */

async function listarCategorias() {
  const tbody = document.getElementById("tbody-categorias");

  tbody.innerHTML = `<tr><td colspan="2">Cargando...</td></tr>`;

  const res = await fetch(`${API_URL}/categorias`);
  const json = await res.json();
  const data = json.data;

  tbody.innerHTML = data.map(c => `
    <tr>
      <td>${c.nombre}</td>
      <td>
        <button class="btn delete" onclick="eliminarCategoria('${c._id}')">🗑️</button>
      </td>
    </tr>
  `).join("");
}

document.getElementById("btn-add-cat").onclick = () => {
  openModal("Nueva Categoría", [
    { label: "Nombre", id: "nombreCat", type: "text" }
  ], async () => {
    await fetch(`${API_URL}/categorias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreCat.value })
    });
    toast("Categoría creada");
    listarCategorias();
  });
};

async function eliminarCategoria(id) {
  await fetch(`${API_URL}/categorias/${id}`, { method: "DELETE" });
  toast("Categoría eliminada", "#ea5455");
  listarCategorias();
}

/* ---------------------- ALMACÉN ---------------------- */

async function listarAlmacen() {
  const tbody = document.getElementById("tbody-almacen");

  tbody.innerHTML = `<tr><td colspan="5">Cargando...</td></tr>`;

  const res = await fetch(`${API_URL}/almacen`);
  const json = await res.json();
  const data = json.data;

  tbody.innerHTML = data.map(a => `
    <tr>
      <td>${a.articuloId}</td>
      <td>${a.categoriaId}</td>
      <td>${a.stock}</td>
      <td>${a.ubicacion}</td>
      <td><button class="btn delete" onclick="eliminarAlmacen('${a._id}')">🗑️</button></td>
    </tr>
  `).join("");
}

document.getElementById("btn-add-almacen").onclick = () => {
  openModal("Añadir a Almacén", [
    { id: "artId", label: "ID Artículo", type: "text" },
    { id: "catId", label: "ID Categoría", type: "text" },
    { id: "stock", label: "Stock", type: "number" },
    { id: "ubi", label: "Ubicación", type: "text" }
  ], async () => {

    await fetch(`${API_URL}/almacen`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articuloId: artId.value,
        categoriaId: catId.value,
        stock: stock.value,
        ubicacion: ubi.value
      })
    });

    toast("Entrada añadida a almacén");
    listarAlmacen();
  });
};

async function eliminarAlmacen(id) {
  await fetch(`${API_URL}/almacen/${id}`, { method: "DELETE" });
  toast("Entrada eliminada", "#ea5455");
  listarAlmacen();
}

/* Init */
listarArticulos();
listarCategorias();
listarAlmacen();
