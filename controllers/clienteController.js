const Cliente = require("../models/Cliente")

// Listar todos los clientes
exports.listarClientes = async (req, res) => {
  try {

  

    const clientes = await Cliente.find().sort({ fecha_creacion: -1 })
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener cliente por ID
exports.obtenerCliente = async (req, res) => {
  try {
 

    const cliente = await Cliente.findOne({ id: req.params.id })
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" })
    }
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Crear nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body)
    await cliente.save()
    res.status(201).json(cliente)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "CI/NIT o email ya existe" })
    } else {
      res.status(400).json({ error: error.message })
    }
  }
}

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true })
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" })
    }
    res.json(cliente)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {    

    const cliente = await Cliente.findOneAndDelete({ id: req.params.id })
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" })
    }
    res.json({ message: "Cliente eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
