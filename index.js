const express = require('express')
const rutasProductos = express.Router()
const Contenedor = require('./Contenedor') 
const contenedorProductos = new Contenedor()

const app = express()

const PORT = 8080
// const statusOk = 200
// const statusCreated = 201
// const statusErrClient = 400
// const statusNotFound = 404
// const statusErrServer = 500

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/productos', rutasProductos)

rutasProductos.get('/', (req, res) => {

    const productos = contenedorProductos.getAll
    res.json(productos)
})

rutasProductos.get('/:id', (req, res) => {

    const productosPorId = contenedorProductos.getById(req.params.id)
    if (productosPorId != undefined) {

        return res.json(productosPorId)
    }

    return res.json({ error : 'producto no encontrado' })
})

rutasProductos.post('/', (req, res) => {
    const { title, price } = req.body
    const productoNuevo = contenedorProductos.save(title, price)
    res.json(productoNuevo)
})

rutasProductos.put('/:id', (req, res) => {

    const productosPorId = contenedorProductos.getById(req.params.id)
    if (productosPorId) {
        const { title, price } = req.body
        if (title != undefined && price != undefined) {
            
            const productoActualizado = contenedorProductos.update(req.params.id, title, price)
            return res.json(productoActualizado)
        }
        return res.json({ error : 'complete el formulario' })
    }
    return res.json({ error : 'no existe el producto' })
})

rutasProductos.delete('/:id', (req, res) => {

    const productosPorId = contenedorProductos.getById(req.params.id)

    if (productosPorId) {
        
        const productoEliminado = contenedorProductos.delete(req.params.id)

        return res.json({ mensaje : 'el producto fue eliminado', producto: productoEliminado })
    }
    return res.json({ error : 'no existe el producto' })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})