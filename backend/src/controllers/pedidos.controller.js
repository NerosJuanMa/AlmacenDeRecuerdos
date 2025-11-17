//pedidos.controller.js
import Pedido from "../models/Pedidos.js";
 
class PedidosController {
 
  // GET /api/pedidos - Listar todos
  async listarPedidos(req, res) {
    try {
      const pedidos = await Pedido.find().populate('productos.producto');
      res.json({ status: 'ok', data: pedidos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al listar pedidos' });
    }
  }
 
  // GET /api/pedidos/:id - Obtener uno
  async obtenerPedido(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id).populate('productos.producto');
      if (!pedido) {
        return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
      }
      res.json({ status: 'ok', data: pedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al obtener pedido' });
    }
  }
 
  // POST /api/pedidos - Crear
  async crearPedido(req, res) {
    try {
      const doc = await Pedido.create(req.body);
      res.status(201)
        .location(`/api/pedidos/${doc._id}`)
        .json({ status: 'ok', data: doc });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
 
  // PATCH /api/pedidos/:id - Actualizar
  async actualizarPedido(req, res) {
    try {
      const pedido = await Pedido.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!pedido) {
        return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
      }
      res.json({ status: 'ok', data: pedido });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
 
  // DELETE /api/pedidos/:id - Eliminar
  async eliminarPedido(req, res) {
    try {
      const pedido = await Pedido.findByIdAndDelete(req.params.id);
      if (!pedido) {
        return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al eliminar pedido' });
    }
  }
}
 
export default new PedidosController();
 
 