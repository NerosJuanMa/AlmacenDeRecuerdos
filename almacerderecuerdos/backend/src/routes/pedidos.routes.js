import express from 'express';
const { Router } = express;
import PedidosController from "../controllers/pedidos.controller.js";
 
const route = Router();
 
// READ
route.get("/", PedidosController.listarPedidos);
route.get("/:id", PedidosController.obtenerPedido);
 
// CREATE
route.post("/", PedidosController.crearPedido);
 
// UPDATE
route.patch("/:id", PedidosController.actualizarPedido);
 
// DELETE
route.delete("/:id", PedidosController.eliminarPedido);
 
export default route;
 