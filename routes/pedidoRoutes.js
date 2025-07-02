const express = require("express")
const router = express.Router()
const pedidoController = require("../controllers/pedidoController")

// GET /api/pedidos - Listar todos los pedidos
router.get("/", pedidoController.listarPedidos)

// GET /api/pedidos/:id - Obtener pedido por ID
router.get("/:id", pedidoController.obtenerPedido)

// POST /api/pedidos - Crear nuevo pedido
router.post("/", pedidoController.crearPedido)

// PUT /api/pedidos/:id - Actualizar pedido
router.put("/:id", pedidoController.actualizarPedido)

// DELETE /api/pedidos/:id - Eliminar pedido
router.delete("/:id", pedidoController.eliminarPedido)

// CERRAR /api/pedidos/:id/cerrar - Cerrar pedido
router.put("/:id/cerrar", pedidoController.cerrarPedido)

module.exports = router
