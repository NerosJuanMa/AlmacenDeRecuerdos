import express from 'express';
//import { Router } from 'express';

// 🔹 Creamos un "enrutador" de Express
const route = express.Router();
//const route = Router();

// 🔹 Importamos el controlador (lógica de los productos)
import productosController from '../controllers/productos.controller.js';

// 🔹 Definimos las rutas básicas del recurso "productos"
route.get('/', productosController.listarProductos);         // obtener todos los productos
route.post('/', productosController.crearProducto);        // crear un nuevo producto
route.get('/:id', productosController.obtenerProducto);      // obtener un producto por ID
route.put('/:id', productosController.actualizarProducto);      // actualizar un producto
route.patch('/:id', productosController.actualizarCampoProducto);      // actualizar un campo de un producto
route.delete('/:id', productosController.eliminarProducto);   // eliminar un producto


// 🔹 Exportamos el router para poder usarlo en el servidor
export default route;
