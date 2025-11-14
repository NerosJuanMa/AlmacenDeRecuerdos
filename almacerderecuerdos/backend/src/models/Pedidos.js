import mongoose from "mongoose";

// Definimos el esquema
const pedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true, trim: true },
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true, min: 1, default: 1 }
  }],
  total: { type: Number, required: true, min: 0 },
  estado: { type: String, enum: ['pendiente', 'completado', 'cancelado'], default: 'pendiente' }
}, { timestamps: true });
 
// Creamos el modelo
const Pedido = mongoose.model('Pedido', pedidoSchema);
 
export default Pedido;

// import mongoose from "mongoose";

// const itemPedidoSchema = new mongoose.Schema({
//   producto: {
//     type: mongoose.Schema.Types.ObjectId, // 👈 referencia
//     ref: "Producto",                      // 👈 al modelo Producto
//     required: true
//   },
//   cantidad: {
//     type: Number,
//     required: true,
//     min: 1
//   }
// }, { _id: false });

// const pedidoSchema = new mongoose.Schema({
//   cliente:   { type: String, required: true, trim: true },
//   productos: [itemPedidoSchema],   // 👈 array de productos
//   total:     { type: Number, required: true, min: 0 },
//   estado:    { type: String, enum: ["pendiente", "completado", "cancelado"], default: "pendiente" }
// }, { timestamps: true });

// const Pedido = mongoose.model("Pedido", pedidoSchema);
// export default Pedido;
