const { Producto } = require("../models/producto.js")

module.exports.getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
        console.log('productos controller: ' + productos)
        return res.status(200).json({
            data: productos
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}