import Articulo from '../models/Articulo.js'; // ← importa el modelo

class ArticulosController {
    async listarArticulos(req, res) {
        try {
        // 1) Buscar todos los articulos (sin filtros)
        const articulos = await Articulo.find({});   // ← consulta a MongoDB

        // 2) Responder con JSON
        res.json({ status: 'ok', data: articulos });
        } 
        catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al listar articulos' });
        }
    }

   async crearArticulo(req, res) {
        try {
            const doc = await Articulo.create(req.body);
            res.status(201)
            .location(`/api/articulos/${doc._id}`)
            .json({ status: 'ok', data: doc });
        } 
        catch (error) {
            res.status(500).json({ status: 'error', mensaje: 'Error al crear el Articulo' });
        }
    }
  obtenerArticulo = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: `Obteniendo Articulo con ID ${req.params.id}` });
  }

  async actualizarArticulo(req, res) {
    try {
      const articuloActualizado = await Articulo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,          // devuelve el documento ya actualizado
          runValidators: true // ✅ aplica validaciones del Schema al actualizar
        }
      );

      if (!articuloActualizado) {
        return res.status(404).json({ status: "error", message: "Articulo no encontrado" });
      }

      res.json({ status: "ok", data: articuloActualizado });
    } 
    catch (error) {
      console.error(error);
      res.status(400).json({ status: "error", message: error.message });
    }
  }


  eliminarArticulo = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Articulo eliminado' });
  };
}

export default new ArticulosController();
