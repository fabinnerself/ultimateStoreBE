const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const productoEnPedidoSchema = new mongoose.Schema({
  producto_id: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  precio_unitario: {
    type: Number,
    required: true,
    min: 0,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1,
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
})

const pedidoSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  fecha_hora_inicio: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["En Curso", "Cerrado"],
    default: "En Curso",
  },
  cliente_id: {
    type: String,
    required: true,
  },
  productos: [productoEnPedidoSchema],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  fecha_cerrado: {
    type: Date,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now,
  },
})

// Middleware para actualizar fecha_actualizacion y fecha_cerrado
pedidoSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.fecha_actualizacion = new Date()
  }

  if (this.estado === "Cerrado" && !this.fecha_cerrado) {
    this.fecha_cerrado = new Date()
  }

  next()
})

module.exports = mongoose.model("Pedido", pedidoSchema)
