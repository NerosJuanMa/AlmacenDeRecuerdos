import express from 'express';
//import { Router } from 'express';

// 🔹 Creamos un "enrutador" de Express
const route = express.Router();

// 🔹 Importamos el controlador (lógica de los articulos)
import articulosController from '../controllers/articulos.controller.js';

// 🔹 Definimos las rutas básicas del recurso "articulos"
route.get('/', articulosController.listarArticulos);         // obtener todos los articulos
route.post('/', articulosController.crearArticulo);        // crear un nuevo articulos
route.get('/:id', articulosController.obtenerArticulo);      // obtener un articulos por ID
route.put('/:id', articulosController.actualizarArticulo);      // actualizar un articulos
route.delete('/:id', articulosController.eliminarArticulo);   // eliminar un articulos


// 🔹 Exportamos el router para poder usarlo en el servidor
export default route;
