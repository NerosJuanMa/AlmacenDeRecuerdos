const API_URL = 'http://localhost:4000/api';

// =================== DARK MODE ===================
const toggleDark = document.getElementById("toggle-dark");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
});
if(localStorage.getItem("dark")==="true") document.body.classList.add("dark");

// =================== NAV ===================
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", ()=> {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.id.replace("tab-","")).classList.add("active");
  });
});

// =================== MODALES ===================
document.querySelectorAll(".btn-add").forEach(btn=>{
  btn.addEventListener("click",()=>document.getElementById(btn.dataset.target).classList.add("active"));
});
document.querySelectorAll(".btn-cancel").forEach(btn=>{
  btn.addEventListener("click",()=>btn.closest(".modal").classList.remove("active"));
});

// =================== FETCH & CRUD ===================
// Helper Toast
const showToast=(msg,type="info")=>{
  Toastify({
    text: msg,
    duration: 3000,
    gravity:"top",
    position:"right",
    backgroundColor: type==="success"? "#4caf50": type==="error"? "#dc3545":"#2196F3"
  }).showToast();
}

// Infinite Scroll Variables
let articuloPage=1, categoriaPage=1, almacenPage=1, limit=10;

// ===== ARTÍCULOS =====
const tablaArticulos=document.querySelector("#tabla-articulos tbody");
const loaderArt=document.getElementById("loader-articulos");

async function listarArticulos(page=1){
  loaderArt.style.display="block";
  try{
    const res=await fetch(`${API_URL}/articulos?page=${page}&limit=${limit}`);
    const data=await res.json();
    loaderArt.style.display="none";

    if(!Array.isArray(data.data) || data.data.length===0){
      if(page===1) tablaArticulos.innerHTML="<tr><td colspan='9'>📭 No hay artículos</td></tr>";
      return;
    }
    if(page===1) tablaArticulos.innerHTML="";

    data.data.forEach(a=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`
        <td>${a.nombre}</td>
        <td>${a.precio||""}</td>
        <td>${a.tamaño||""}</td>
        <td>${a.color||""}</td>
        <td>${a.imagen||""}</td>
        <td>${a.historia_procedencia||""}</td>
        <td>${a.disponibilidad||""}</td>
        <td>${a.estado||""}</td>
        <td>
          <button onclick="eliminarArticulo('${a._id}')">🗑️</button>
        </td>`;
      tablaArticulos.appendChild(tr);
    });

  }catch(e){ showToast("Error al cargar articulos","error"); }
}

async function eliminarArticulo(id){
  if(confirm("⚠ Estás seguro de eliminar este artículo?")){
    await fetch(`${API_URL}/articulos/${id}`,{method:"DELETE"});
    showToast("Artículo eliminado","success");
    listarArticulos(1);
  }
}

// ===== CATEGORÍAS =====
const tablaCategorias=document.querySelector("#tabla-categorias tbody");
const loaderCat=document.getElementById("loader-categorias");

async function listarCategorias(page=1){
  loaderCat.style.display="block";
  try{
    const res=await fetch(`${API_URL}/categorias?page=${page}&limit=${limit}`);
    const data=await res.json();
    loaderCat.style.display="none";
    if(!Array.isArray(data.data) || data.data.length===0){
      if(page===1) tablaCategorias.innerHTML="<tr><td colspan='2'>📭 No hay categorías</td></tr>";
      return;
    }
    if(page===1) tablaCategorias.innerHTML="";
    data.data.forEach(c=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`
        <td>${c.nombre}</td>
        <td><button onclick="eliminarCategoria('${c._id}')">🗑️</button></td>`;
      tablaCategorias.appendChild(tr);
    });
  }catch(e){ showToast("Error al cargar categorias","error"); }
}

async function eliminarCategoria(id){
  if(confirm("⚠ Estás seguro de eliminar esta categoría?")){
    await fetch(`${API_URL}/categorias/${id}`,{method:"DELETE"});
    showToast("Categoría eliminada","success");
    listarCategorias(1);
  }
}

// ===== ALMACÉN =====
const tablaAlmacen=document.querySelector("#tabla-almacen tbody");
const loaderAlm=document.getElementById("loader-almacen");

async function listarAlmacen(page=1){
  loaderAlm.style.display="block";
  try{
    const res=await fetch(`${API_URL}/almacen?page=${page}&limit=${limit}`);
    const data=await res.json();
    loaderAlm.style.display="none";
    if(!Array.isArray(data.data)||data.data.length===0){
      if(page===1) tablaAlmacen.innerHTML="<tr><td colspan='5'>📭 No hay registros</td></tr>";
      return;
    }
    if(page===1) tablaAlmacen.innerHTML="";
    data.data.forEach(a=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`
        <td>${a.articuloId}</td>
        <td>${a.categoriaId}</td>
        <td>${a.stock}</td>
        <td>${a.ubicacion}</td>
        <td>
          <button onclick="editarAlmacen('${a._id}')">✏️</button>
          <button onclick="eliminarAlmacen('${a._id}')">🗑️</button>
        </td>`;
      tablaAlmacen.appendChild(tr);
    });
  }catch(e){ showToast("Error al cargar almacén","error"); }
}

async function eliminarAlmacen(id){
  if(confirm("⚠ Estás seguro de eliminar este registro?")){
    await fetch(`${API_URL}/almacen/${id}`,{method:"DELETE"});
    showToast("Registro eliminado","success");
    listarAlmacen(1);
  }
}

// Inicializar
listarArticulos();
listarCategorias();
listarAlmacen();
