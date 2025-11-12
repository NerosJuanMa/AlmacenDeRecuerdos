import mongoose from 'mongoose';

// 1) Definir el esquema
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  stock:  { type: Number, default: 0, min: 0 },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

// 2) Crear el modelo (puente con la colección)
const Producto = mongoose.model('Producto', productoSchema);

// Creamos el modelo a partir del esquema
export default mongoose.model('Producto', productoSchema);