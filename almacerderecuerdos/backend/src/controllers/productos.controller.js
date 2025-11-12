// src/controllers/productos.controller.js
class ProductosController {
  listarProductos = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Listado de productos' });
  };

  crearProducto = async (req, res) => {
    res.status(201).json({ status: 'ok', mensaje: 'Producto creado' });
  };

  obtenerProducto = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: `Obteniendo producto con ID ${req.params.id}` });
  };

  actualizarProducto = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Producto actualizado' });
  };

  eliminarProducto = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Producto eliminado' });
  };
}

export default new ProductosController();
