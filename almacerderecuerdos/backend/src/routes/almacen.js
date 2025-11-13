import express from 'express';
//import { Router } from 'express';

// 🔹 Creamos un "enrutador" de Express
const route = express.Router();

// 🔹 Importamos el controlador (lógica de los almacen)
import almacenController from '../controllers/almacen.controller.js';

// 🔹 Definimos las rutas básicas del recurso "almacen"
route.get('/', almacenController.listarAlmacen);         // obtener todos los almacen
route.post('/', almacenController.crearAlmacen);        // crear un nuevo almacen
route.get('/:id', almacenController.obtenerAlmacen);      // obtener un almacen por ID
route.put('/:id', almacenController.actualizarAlmacen);      // actualizar un almacen
route.delete('/:id', almacenController.eliminarAlmacen);   // eliminar un almacen


// 🔹 Exportamos el router para poder usarlo en el servidor
export default route;
