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

export default mongoose.model("Articulo", articuloSchema);
