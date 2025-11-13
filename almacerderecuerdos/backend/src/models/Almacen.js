import mongoose from "mongoose";

const almacenSchema = new mongoose.Schema({
  articulo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Articulo" },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  stock: Number,
  ubicacion: String
});
// 2) Crear el modelo (puente con la colección)
const Almacen = mongoose.model('Almacen', almacenSchema, "almacen");

export default Almacen;
