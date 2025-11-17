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

  async obtenerProducto(req, res) {
  try {

    // 1️⃣ Extraemos el ID que llega por la URL (ruta dinámica: /api/productos/:id)
    //    Ejemplo de URL: /api/productos/67abc1230d91f89c3a7e1021
    //    req.params.id contiene ese valor.
    const producto = await Producto.findById(req.params.id);

    // 2️⃣ Si no existe un documento con ese ID → devolvemos 404 (no encontrado)
    if (!producto) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }

    // 3️⃣ Si todo va bien → enviamos el producto encontrado
    res.json({
      status: 'ok',
      data: producto
    });

  } catch (error) {

    // 4️⃣ Errores inesperados (por ejemplo un ID mal formado: "1234" en vez de un ObjectId)
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Error al obtener producto'
    });
  }
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

async actualizarCampoProducto(req, res) {
  try {
    const { id } = req.params;
    const cambios = req.body; // solo los campos que queremos tocar

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { $set: cambios },      // 🧩 solo se modifican estos campos
      {
        new: true,            // devuelve el documento actualizado
        runValidators: true   // 🔒 aplica reglas del Schema también en PATCH
      }
    );

    if (!productoActualizado) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'ok', data: productoActualizado });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ status: 'error', message: error.message });
  }
}


  async eliminarProducto(req, res) {
    try {
      const producto = await Producto.findByIdAndDelete(req.params.id);
      if (!producto) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al eliminar producto' });
    }
  }

}

export default new ProductosController();
