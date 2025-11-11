import mongoose from "mongoose";

const almacenSchema = new mongoose.Schema({
  articulo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Articulo" },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  stock: Number,
  ubicacion: String
});

export default mongoose.model("Almacen", almacenSchema);
