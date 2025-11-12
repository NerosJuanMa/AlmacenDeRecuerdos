import express from "express";
import Categoria from "./models/Categoria.js";

const router = express.Router();

// Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer una categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una categoría
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una categoría
router.delete("/:id", async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
