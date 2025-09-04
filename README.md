# 📌 ultimateStoreBE - API DE GESTIÓN DE TIENDA 

Backend para gestión de pedidos, clientes y productos usando las siguentes tecnologias:

- Node.js
- Express
- dotenv
- MongoDB (mongoose)
- cors
- uuid
- Multitenat
- Postman (pruebas)

#🔗 Rutas Está disponible el siguiente recurso:

https://ultimatestorebe.onrender.com/api/clientes 

## 🌟 Características

- Operaciones **CRUD** completas para las entidades: clientes, productos y pedidos.
- Verificación de existencia de clientes y productos al crear un pedido, garantizando la integridad de los datos.
- **Soporte multi-tenant**: cada entidad incluye un campo `tenantId` que permite gestionar datos de múltiples inquilinos en una misma base de datos, garantizando el aislamiento lógico entre ellos.
- **Gestión detallada de errores** y respuestas claras ante situaciones como:
  - Falta de información o identificadores inválidos.
  - Errores internos del servidor (500).
  - Solicitudes incorrectas o mal formadas (400).

## 🛠️ Instalación

1. Clonar el proyecto
```bash
git clone https://github.com/fabinnerself/ultimateStoreBE.git
```
luego
```bash
cd ultimateStoreBE
```
2. Instalar dependencias:

```bash
npm install
```

3. Asegúrate de tener MongoDB corriendo en `mongodb://localhost:27017` asimismo verificar que exista la base de datos tienda_db.

4. Copia el archivo .env.template a .env y verifica que la configuración de la base de datos MongoDB sea correcta

5. Ejecutar en modo desarrollo:
```bash
npm run dev
```
6. Con Postman u otra herramienta, ejecutar los endpoints
7. ⚠️Recuerda incluir la cabecera `x-tenant-id` en todas las solicitudes a las entidades, para garantizar el correcto funcionamiento del sistema multi-tenant.

## 📘 Documentacion de la API 

Este backend está diseñado para gestionar las operaciones esenciales de una tienda, permitiendo el manejo eficiente de las tres entidades principales: clientes , productos y pedidos .

Clientes: Facilita el registro y administración de clientes, incluyendo sus datos personales y estado (activo o bloqueado).

Productos: Permite el control del catálogo de productos, incluyendo nombre, marca y precio.

Pedidos: Ofrece soporte completo al ciclo de vida de un pedido, desde su creación hasta su cierre, asociando clientes y productos de forma organizada y segura.

El sistema asegura integridad y consistencia en cada transacción, facilitando operaciones como el registro, modificación, consulta y eliminación de registros.

🔗 Rutas disponibles

| Recurso    | URL Base                            |
|-------------------|------------------------------|
| Clientes   | http://localhost:3000/api/clientes  |
| Pedidos    | http://localhost:3000/api/pedidos   |
| Productos  | http://localhost:3000/api/productos |

La documentación completa de los endpoints, ejemplos de uso y respuestas esperadas está disponible en Postman:  [Postman Documentation](https://documenter.getpostman.com/view/22674808/2sB34Zs4jL).


## 🧾 Descripción de Entidades

### 📦 Clientes

Representa a una persona que realiza compras en la tienda. Contiene información detallada como su nombre completo , identificación personal (CI/NIT), correo electrónico , número de teléfono y estado actual (activo o bloqueado). Además, registra las fechas de creación última actualización del cliente.

**Operaciones soportadas:**

- `GET /api/clientes` - Listar todos los clientes
- `GET /api/clientes/:id` - Obtener cliente por ID
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### 📦 Productos

Representa un artículo disponible para la venta en la tienda. Contiene información detallada como su nombre, marca, precio unitario y estado actual (activo o bloqueado). Además, registra las fechas de creación y última actualización del producto.

**Operaciones soportadas:**

- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### 📦 Pedidos

Representa una solicitud de compra realizada por un cliente en la tienda. Contiene información detallada como la hora del pedido, estado actual (En Curso o Cerrado), cliente asociado. Además, registra el monto total del pedido y las fechas de creación y última actualización.

**Operaciones soportadas:**

- `GET /api/pedidos` - Listar pedidos (con nombre del cliente y total)
- `GET /api/pedidos/:id` - Obtener pedido por ID
- `POST /api/pedidos` - Crear nuevo pedido
- `PUT /api/pedidos/:id` - Actualizar pedido
- `DELETE /api/pedidos/:id` - Eliminar pedido
- `PUT /api/pedidos/:id/cerrar` - Cerrar pedido

⚠️ Importante: Todas las rutas requieren el header `x-tenant-id` para funcionar correctamente. Sin este campo, las operaciones no se ejecutarán. 

## 🧪 Ejemplos de uso

### Crear Cliente
```json
POST /api/clientes
{
  "nombre_completo": "Juan Pérez",
  "ci_nit": "12345678",
  "email": "juan@email.com",
  "telefono": "70123456"
}
```

### Crear Producto
```json
POST /api/productos
{
  "nombre": "Laptop HP",
  "marca": "HP",
  "precio": 1500.00
}
```

### Crear Pedido
```json
POST /api/pedidos
{
  "cliente_id": "uuid-del-cliente",
  "productos": [
    {
      "producto_id": "uuid-del-producto",
      "cantidad": 2
    }
  ]
}
 ```
 
## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, envíe un pull request o abra un issue para reportar errores o sugerir nuevas características.

## 📜 Licencia
 
Este proyecto está bajo la MIT License, para más detalles sobre los términos de la licencia, visita [MIT License](https://choosealicense.com/licenses/mit/ ).


## 🚀 AUTOR
👤 Favian Medina Gemio

| Recurso      | Direccion                            |
|--------------|---------------------------------------------------------------------------------------------------|
|📧 Email     |[favian.medina.gemio@gmail.com](favian.medina.gemio@gmail.com)                                      |
|💻 GitHub    |[https://github.com/fabinnerself](https://github.com/fabinnerself)                       |
|🧠 LinkedIn  |[https://www.linkedin.com/in/favian-medina-gemio/](https://www.linkedin.com/in/favian-medina-gemio/)|
|💼 Portafolio|[https://favian-medina-cv.vercel.app/](https://favian-medina-cv.vercel.app/)|
 

(c) 2025