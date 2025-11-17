import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: String,
  imagen: String
});
// 2) Crear el modelo (puente con la colección)
const Categoria = mongoose.model('Categoria', categoriaSchema, "categorias");

export default Categoria;
