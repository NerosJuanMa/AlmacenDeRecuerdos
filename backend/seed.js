import mongoose from "mongoose";
import dotenv from "dotenv";
import Articulo from "../models/Articulo.js";
import Categoria from "../models/Categoria.js";
import Almacen from "../models/Almacen.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("Conectado a MongoDB Atlas para seed");

await Articulo.deleteMany({});
await Categoria.deleteMany({});
await Almacen.deleteMany({});

const categorias = await Categoria.insertMany([
  { nombre: "menaje_cocina", imagen: null },
  { nombre: "ropa_hombre", imagen: null },
  { nombre: "ropa_mujer", imagen: null },
  { nombre: "decoracion", imagen: null },
  { nombre: "muebles", imagen: null },
  { nombre: "libros", imagen: null },
  { nombre: "cristaleria", imagen: null },
  { nombre: "herramientas", imagen: null },
  { nombre: "otros", imagen: null }
]);

const articulos = await Articulo.insertMany([
  { nombre: "Taza de cerámica artesanal", precio: 9.99, tamaño: "350 ml", disponibilidad: true, estado: "Nuevo", color: "Blanco" },
  { nombre: "Camisa de lino para hombre", precio: 29.95, tamaño: "L", disponibilidad: true, estado: "Nuevo", color: "Beige" },
  { nombre: "Lámpara de mesa vintage", precio: 45.00, tamaño: "40 cm", disponibilidad: true, estado: "Restaurado", color: "Cobre" },
  { nombre: "Estantería de madera reciclada", precio: 120.00, tamaño: "120x80x30 cm", disponibilidad: false, estado: "Nuevo", color: "Madera" },
  { nombre: "Libro antiguo de poesía española", precio: 25.50, tamaño: "21x14 cm", disponibilidad: true, estado: "Usado", color: "Marrón" },
  { nombre: "Juego de copas de cristal tallado", precio: 39.90, tamaño: "6 unidades", disponibilidad: true, estado: "Nuevo", color: "Transparente" },
  { nombre: "Martillo de carpintero profesional", precio: 15.75, tamaño: "30 cm", disponibilidad: true, estado: "Nuevo", color: "Negro y plateado" },
  { nombre: "Cuadro decorativo abstracto", precio: 85.00, tamaño: "100x70 cm", disponibilidad: true, estado: "Nuevo", color: "Multicolor" }
]);

await Almacen.insertMany([
  { articulo_id: articulos[0]._id, categoria_id: categorias[0]._id, stock: 25, ubicacion: "Pasillo A - Estante 3" },
  { articulo_id: articulos[1]._id, categoria_id: categorias[1]._id, stock: 40, ubicacion: "Pasillo C - Perchero 2" },
  { articulo_id: articulos[2]._id, categoria_id: categorias[3]._id, stock: 12, ubicacion: "Pasillo D - Estante 1" },
  { articulo_id: articulos[3]._id, categoria_id: categorias[4]._id, stock: 5, ubicacion: "Pasillo F - Grandes Volúmenes" },
  { articulo_id: articulos[4]._id, categoria_id: categorias[5]._id, stock: 10, ubicacion: "Pasillo B - Estante 7" },
  { articulo_id: articulos[5]._id, categoria_id: categorias[6]._id, stock: 18, ubicacion: "Pasillo A - Estante 1" },
  { articulo_id: articulos[6]._id, categoria_id: categorias[7]._id, stock: 30, ubicacion: "Pasillo E - Cajón 4" },
  { articulo_id: articulos[7]._id, categoria_id: categorias[3]._id, stock: 8, ubicacion: "Pasillo D - Estante 2" }
]);

console.log("✅ Seed completado con éxito");
await mongoose.disconnect();
