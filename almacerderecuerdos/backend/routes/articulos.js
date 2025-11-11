import express from "express";
import Articulo from "./models/Articulo.js";
const router = express.Router();

// Crear
router.post("/", async (req, res) => {
  const articulo = new Articulo(req.body);
  await articulo.save();
  res.json(articulo);
});

// Leer todos
router.get("/", async (req, res) => {
  res.json(await Articulo.find());
});

// Actualizar
router.put("/:id", async (req, res) => {
  const actualizado = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar
router.delete("/:id", async (req, res) => {
  await Articulo.findByIdAndDelete(req.params.id);
  res.json({ message: "Artículo eliminado" });
});

export default router;
//(Las rutas de categorias.js y almacen.js son iguales, cambiando el modelo.)