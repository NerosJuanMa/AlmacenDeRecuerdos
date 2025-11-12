import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: String,
  imagen: String
});

export default mongoose.model("Categoria", categoriaSchema);
