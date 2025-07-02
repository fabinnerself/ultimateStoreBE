const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/clienteController")

// GET /api/clientes - Listar todos los clientes
router.get("/", clienteController.listarClientes)

// GET /api/clientes/:id - Obtener cliente por ID
router.get("/:id", clienteController.obtenerCliente)

// POST /api/clientes - Crear nuevo cliente
router.post("/", clienteController.crearCliente)

// PUT /api/clientes/:id - Actualizar cliente
router.put("/:id", clienteController.actualizarCliente)

// DELETE /api/clientes/:id - Eliminar cliente
router.delete("/:id", clienteController.eliminarCliente)

module.exports = router
