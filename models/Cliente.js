const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const clienteSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  nombre_completo: {
    type: String,
    required: true,
    trim: true,
  },
  ci_nit: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now,
  },
  tenantId: {
    type: String,
    required: true,
  },
})

// Middleware para actualizar fecha_actualizacion
clienteSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.fecha_actualizacion = new Date()
  }
  next()
})

module.exports = mongoose.model("Cliente", clienteSchema)
