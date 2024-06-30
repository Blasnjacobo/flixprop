const mongoose = require("mongoose")

const productoSchema = new mongoose.Schema(
    {
        codigo: String,
        codigoUniverso: String,
        nombre: String, 
        universo: String, 
        personaje: String, 
        link: String,
        descripcion: String, 
        vendedor: String,
        categoria: String,
        tags: String,
        precio: String,
        imgProducto: String,
        imgEscena: String,
        imgModelo: String,
        imgExtra: String,
        estatus: String,
        masVendido: String,
        masReciente: String,
        tallas: String,
    },
    {
        timestamps: true
    }
)

module.exports.Producto = mongoose.model(
    "Producto",
    productoSchema,
    "productos"
)