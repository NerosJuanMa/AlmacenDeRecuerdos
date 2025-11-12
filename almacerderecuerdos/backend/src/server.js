import express from "express";
import dotenv from "dotenv";
import productosRoutes from './routes/productos.routes.js';//importamos las rutas de productos
import cors from "cors";

//Revisar lo que sigue:
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import articulosRoutes from "./routes/articulos.js";
// import categoriasRoutes from "./routes/categorias.js";
// import almacenRoutes from "./routes/almacen.js";

// 🔹 Cargar variables del archivo .env
dotenv.config();
// 🔹 Crear instancia de la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Aquí decides la ruta base
app.use('/api/productos', productosRoutes);

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

// Rutas
// app.use("/api/articulos", articulosRoutes);
// app.use("/api/categorias", categoriasRoutes);
// app.use("/api/almacen", almacenRoutes);

// Conexión a MongoDB Atlas
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Conectado a MongoDB Atlas");
//     app.listen(process.env.PORT || 4000, () =>
//       console.log(`🚀 Servidor en puerto ${process.env.PORT || 4000}`)
//     );
//   })
//   .catch((err) => console.error("❌ Error al conectar:", err));
  