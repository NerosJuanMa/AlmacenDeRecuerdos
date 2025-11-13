import Almacen from '../models/Almacen.js'; // ← importa el modelo

class AlmacenController {
    async listarAlmacen(req, res) {
        try {
            // 1) Buscar todos los Almacen (sin filtros)
            const almacen = await Almacen.find({});   // ← consulta a MongoDB

            // 2) Responder con JSON
            res.json({ status: 'ok', data: almacen });
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Error al listar Almacen' });
        }
    };
   async crearAlmacen(req, res) {
        try {
            const doc = await Almacen.create(req.body);
            res.status(201)
            .location(`/api/almacen/${doc._id}`)
            .json({ status: 'ok', data: doc });
        } 
        catch (error) {
            res.status(500).json({ status: 'error', mensaje: 'Error al crear el Almacen' });
        }
    };

  obtenerAlmacen = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: `Obteniendo Almacen con ID ${req.params.id}` });
  };

  async actualizarAlmacen(req, res) {
    try {
      const almacenActualizado = await Almacen.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,          // devuelve el documento ya actualizado
          runValidators: true // ✅ aplica validaciones del Schema al actualizar
        }
      );

      if (!almacenActualizado) {
        return res.status(404).json({ status: "error", message: "Almacen no encontrado" });
      }

      res.json({ status: "ok", data: almacenActualizado });
    } 
    catch (error) {
      console.error(error);
      res.status(400).json({ status: "error", message: error.message });
    }
  };


  eliminarAlmacen = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Almacen eliminado' });
  };
}

export default new AlmacenController();