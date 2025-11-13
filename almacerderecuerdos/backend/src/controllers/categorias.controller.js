import Categoria from '../models/Categoria.js'; // ← importa el modelo

class CategoriasController {
    async listarCategorias(req, res) {
        try {
        // 1) Buscar todos los productos (sin filtros)
        const categorias = await Categoria.find({});   // ← consulta a MongoDB

        // 2) Responder con JSON
        res.json({ status: 'ok', data: categorias });
        } 
        catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al listar productos' });
        }
    };

    async crearCategoria(req, res) {
        try {
            const doc = await Categoria.create(req.body);
            res.status(201)
            .location(`/api/categorias/${doc._id}`)
            .json({ status: 'ok', data: doc });
        } 
        catch (error) {
            res.status(500).json({ status: 'error', mensaje: 'Error al crear el Categoria' });
        }
    };
  obtenerCategoria = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: `Obteniendo Categoria con ID ${req.params.id}` });
  };

  async actualizarCategoria(req, res) {
    try {
      const categoriaActualizado = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,          // devuelve el documento ya actualizado
          runValidators: true // ✅ aplica validaciones del Schema al actualizar
        }
      );

      if (!categoriaActualizado) {
        return res.status(404).json({ status: "error", message: "Categoria no encontrado" });
      }

      res.json({ status: "ok", data: categoriaActualizado });
    } 
    catch (error) {
      console.error(error);
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  eliminarCategoria = async (req, res) => {
    res.status(200).json({ status: 'ok', mensaje: 'Categoria eliminado' });
  };
}

export default new CategoriasController();
