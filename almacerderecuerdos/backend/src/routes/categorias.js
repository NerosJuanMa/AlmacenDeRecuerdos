import express from 'express';
//import { Router } from 'express';

// 🔹 Creamos un "enrutador" de Express
const route = express.Router();

// 🔹 Importamos el controlador (lógica de los categorias)
import categoriasController from '../controllers/categorias.controller.js';

// 🔹 Definimos las rutas básicas del recurso "categorias"
route.get('/', categoriasController.listarCategorias);         // obtener todos los categorias
route.post('/', categoriasController.crearCategoria);        // crear un nuevo categorias
route.get('/:id', categoriasController.obtenerCategoria);      // obtener un categorias por ID
route.put('/:id', categoriasController.actualizarCategoria);      // actualizar un categorias
route.delete('/:id', categoriasController.eliminarCategoria);   // eliminar un categorias


// 🔹 Exportamos el router para poder usarlo en el servidor
export default route;
