const express = require("express")
const router = express.Router()
const productoController = require("../controllers/productoController")

// GET /api/productos - Listar todos los productos
router.get("/", productoController.listarProductos)

// GET /api/productos/:id - Obtener producto por ID
router.get("/:id", productoController.obtenerProducto)

// POST /api/productos - Crear nuevo producto
router.post("/", productoController.crearProducto)

// PUT /api/productos/:id - Actualizar producto
router.put("/:id", productoController.actualizarProducto)

// DELETE /api/productos/:id - Eliminar producto
router.delete("/:id", productoController.eliminarProducto)

module.exports = router
