import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import articulosRoutes from "./routes/articulos.js";
import categoriasRoutes from "./routes/categorias.js";
import almacenRoutes from "./routes/almacen.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/articulos", articulosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/almacen", almacenRoutes);

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀 Servidor en puerto ${process.env.PORT || 4000}`)
    );
  })
  .catch((err) => console.error("❌ Error al conectar:", err));
  