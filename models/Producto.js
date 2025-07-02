const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const productoSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  marca: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
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
})

// Middleware para actualizar fecha_actualizacion
productoSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.fecha_actualizacion = new Date()
  }
  next()
})

module.exports = mongoose.model("Producto", productoSchema)
