const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

// Importar rutas
const clienteRoutes = require("./routes/clienteRoutes")
const productoRoutes = require("./routes/productoRoutes")
const pedidoRoutes = require("./routes/pedidoRoutes")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/tienda_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err))

// Rutas
app.use("/api/clientes", clienteRoutes)
app.use("/api/productos", productoRoutes)
app.use("/api/pedidos", pedidoRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" })
})

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Algo salió mal!" })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
