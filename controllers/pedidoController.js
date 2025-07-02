const Pedido = require("../models/Pedido")
const Cliente = require("../models/Cliente")
const Producto = require("../models/Producto")

// Listar todos los pedidos con información del cliente
exports.listarPedidos = async (req, res) => {
  try {
    
    const pedidos = await Pedido.find().sort({ fecha_creacion: -1 })

    // Obtener información de clientes para cada pedido
    const pedidosConCliente = await Promise.all(
      pedidos.map(async (pedido) => {
        const cliente = await Cliente.findOne({ id: pedido.cliente_id })
        return {
          id_pedido: pedido.id,
          estado: pedido.estado,
          hora_pedido: pedido.fecha_hora_inicio,
          nombre_completo: cliente ? cliente.nombre_completo : "Cliente no encontrado",
          total: pedido.total,
        }
      }),
    )

    res.json(pedidosConCliente)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener pedido por ID
exports.obtenerPedido = async (req, res) => {
  try {

    

    const pedido = await Pedido.findOne({ id: req.params.id })
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" })
    }

    // Obtener información del cliente
    const cliente = await Cliente.findOne({ id: pedido.cliente_id })

    res.json({
      ...pedido.toObject(),
      cliente: cliente || null,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Crear nuevo pedido
exports.crearPedido = async (req, res) => {
  try {


    const { cliente_id, productos } = req.body

    // Verificar que el cliente existe
    const cliente = await Cliente.findOne({ id: cliente_id })
    if (!cliente) {
      return res.status(400).json({ error: "Cliente no encontrado" })
    }

    // Verificar productos y calcular subtotales
    const productosValidados = []
    let total = 0

    for (const item of productos) {
      const producto = await Producto.findOne({ id: item.producto_id })
      if (!producto) {
        return res.status(400).json({ error: `Producto ${item.producto_id} no encontrado` })
      }

      const subtotal = producto.precio * item.cantidad
      productosValidados.push({
        producto_id: producto.id,
        nombre: producto.nombre,
        precio_unitario: producto.precio,
        cantidad: item.cantidad,
        subtotal: subtotal,
      })

      total += subtotal
    }

    const pedido = new Pedido({
      cliente_id,
      productos: productosValidados,
      total,
    })

    await pedido.save()
    res.status(201).json(pedido)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Actualizar pedido
exports.actualizarPedido = async (req, res) => {
  try {
    const { productos, estado } = req.body
    const pedido = await Pedido.findOne({ id: req.params.id })

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" })
    }

    // Si se actualizan productos, recalcular total
    if (productos) {
      const productosValidados = []
      let total = 0

      for (const item of productos) {
        const producto = await Producto.findOne({ id: item.producto_id })
        if (!producto) {
          return res.status(400).json({ error: `Producto ${item.producto_id} no encontrado` })
        }

        const subtotal = producto.precio * item.cantidad
        productosValidados.push({
          producto_id: producto.id,
          nombre: producto.nombre,
          precio_unitario: producto.precio,
          cantidad: item.cantidad,
          subtotal: subtotal,
        })

        total += subtotal
      }

      pedido.productos = productosValidados
      pedido.total = total
    }

    // Actualizar estado si se proporciona
    if (estado) {
      pedido.estado = estado
    }

    await pedido.save()
    res.json(pedido)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Eliminar pedido
exports.eliminarPedido = async (req, res) => {
  try {

// Simula un error interno del servidor
    throw new Error("Error 500 internal error para eliminar pedido");

    const pedido = await Pedido.findOneAndDelete({ id: req.params.id })
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" })
    }
    res.json({ message: "Pedido eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
