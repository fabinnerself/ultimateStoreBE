const Producto = require("../models/Producto")
const { getTenantId } = require('../middlewares/tenantMiddleware');

// Listar todos los productos
exports.listarProductos = async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const productos = await Producto.find({ tenantId }).sort({ fecha_creacion: -1 })
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener producto por ID
exports.obtenerProducto = async (req, res) => {
  try {
    
    const producto = await Producto.findOne({ id: req.params.id })
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Crear nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const tenantId = getTenantId(req);
    const producto = new Producto(req.body)
    producto.tenantId = tenantId;
    await producto.save()
    res.status(201).json(producto)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(producto)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndDelete({ id: req.params.id })
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ message: "Producto eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
