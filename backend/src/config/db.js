// Conexión a MongoDB Atlas
// src/config/db.js
import mongoose from "mongoose";

export async function connectDB() {
  try {
    // 1️⃣ Leemos la URI completa y el nombre de la base desde el archivo .env
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || "almacen_recuerdos";

    if (!uri) {
      console.error("❌ No se encontró la variable MONGODB_URI en el archivo .env");
      process.exit(1);
    }

    // 2️⃣ Intentamos establecer la conexión con Mongoose
    await mongoose.connect(uri, {
      dbName,
      autoIndex: true, // crea índices si los defines en tus Schemas
    });

    console.log(`✅ Conectado a MongoDB → Base de datos: ${dbName}`);
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1); // Detiene el servidor si no puede conectar
  }
}