import express from "express";
import dotenv from "dotenv";
import productosRoutes from './routes/productos.routes.js';//importamos las rutas de productos
import pedidosRoutes from './routes/pedidos.routes.js';//importamos las rutas de productos
import cors from "cors";
import { connectDB } from './config/db.js';
//Revisar lo que sigue:
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
import articulosRoutes from './routes/articulos.js';
import categoriasRoutes from './routes/categorias.js';
import almacenRoutes from './routes/almacen.js';

// 🔹 Cargar variables del archivo .env
dotenv.config();
// 🔹 Crear instancia de la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
await connectDB();

// ✅ Aquí decides la ruta base
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);

app.use("/api/articulos", articulosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/almacen", almacenRoutes);


// 🔹 Usar el puerto definido en .env o un valor por defecto
const PORT = process.env.PORT || 3000;

try {
  // 🔹 Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Error al iniciar el servidor:', error);
}


//app.use(bodyParser.json());
