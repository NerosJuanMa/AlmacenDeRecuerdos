import express from "express";
import Almacen from "./models/Almacen.js";

const router = express.Router();

// Crear nueva entrada en almacén
router.post("/", async (req, res) => {
  try {
    const registro = new Almacen(req.body);
    await registro.save();
    res.json(registro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer todos los registros del almacén (con joins)
router.get("/", async (req, res) => {
  try {
    const registros = await Almacen.find()
      .populate("articulo_id", "nombre precio")
      .populate("categoria_id", "nombre");
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer un registro por ID
router.get("/:id", async (req, res) => {
  try {
    const registro = await Almacen.findById(req.params.id)
      .populate("articulo_id", "nombre precio")
      .populate("categoria_id", "nombre");
    if (!registro) return res.status(404).json({ message: "Registro no encontrado" });
    res.json(registro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un registro
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Almacen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un registro
router.delete("/:id", async (req, res) => {
  try {
    await Almacen.findByIdAndDelete(req.params.id);
    res.json({ message: "Registro eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
