import Producto from '../models/Productos.js'; // ← importa el modelo

// src/controllers/productos.controller.js
class ProductosController {
  async listarProductos(req, res) {
      try {
        // 1) Buscar todos los productos (sin filtros)
        const productos = await Producto.find({});   // ← consulta a MongoDB

        // 2) Responder con JSON
        res.json({ status: 'ok', data: productos });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al listar productos' });
      }
    };

    async crearProducto(req, res) {
    try {
      const doc = await Producto.create(req.body);
      res.status(201)
        .location(`/api/productos/${doc._id}`)
        .json({ status: 'ok', data: doc });
    } catch (error) {
      res.status(500).json({ status: 'error', mensaje: 'Error al crear el producto' });
    }
  };
  obtenerProducto = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: `Obteniendo producto con ID ${req.params.id}` });
  };


  async actualizarProducto(req, res) {
    try {
      const productoActualizado = await Producto.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,          // devuelve el documento ya actualizado
          runValidators: true // ✅ aplica validaciones del Schema al actualizar
        }
      );

      if (!productoActualizado) {
        return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      }

      res.json({ status: "ok", data: productoActualizado });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  eliminarProducto = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Producto eliminado' });
  };
}

export default new ProductosController();
