import mongoose from "mongoose";

// 1. Definimos el esquema
const productoSchema = new mongoose.Schema({
  nombre:     { type: String, required: true, trim: true },
  precio:     { type: Number, required: true, min: 0 },
  stock:      { type: Number, default: 0 },
  categoria:  { type: String, enum: ["ropa","accesorios","tecnologia"], default: "accesorios" },
  activo:     { type: Boolean, default: true },
  tallas:     { type: [String], default: undefined },
  detalles:   { 
    type: new mongoose.Schema({
      color: String, 
      material: String 
    }, { _id: false })
  }
}, { timestamps: true })

// 2) Crear el modelo (puente con la colección)
const Producto = mongoose.model("Producto", productoSchema, "productos");
export default Producto;