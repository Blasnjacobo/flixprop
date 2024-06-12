const { Categoria } = require("../models/categoria.js")

module.exports.getAllCategorias = async (req, res) => {
    try {
        const noticias = await Categoria.find()
        return res.status(200).json({
            data: categorias
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}
