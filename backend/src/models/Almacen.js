import mongoose from "mongoose";

// Definimos el esquema
const almacenSchema = new mongoose.Schema({
  
  articulos: [{
    articulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Articulo', required: true },
    cantidad: { type: Number, required: true, min: 1, default: 1 },
    ubicacion: { type: String, default: 'pendiente de ubicar' },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    estado: { type: String, enum: ['pendiente', 'completado', 'cancelado'], default: 'pendiente' }
  }],  
  
  stock: { type: Number, required: true, min: 0 },
  
}, { timestamps: true });
 
// Creamos el modelo
const Almacen = mongoose.model('Almacen', almacenSchema, 'almacen');
 
export default Almacen;