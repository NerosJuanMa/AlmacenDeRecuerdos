import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema({
  nombre: String,
  imagen: String,
  precio: Number,
  tamaño: String,
  historia_procedencia: String,
  disponibilidad: Boolean,
  estado: String,
  color: String
});
// 2) Crear el modelo (puente con la colección)
const Articulo = mongoose.model('Articulo', articuloSchema, "articulos");

export default Articulo;