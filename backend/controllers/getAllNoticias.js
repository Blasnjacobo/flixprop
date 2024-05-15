const { Noticia } = require("../models/noticia.js")

module.exports.getAllNoticias = async (req, res) => {
    try {
        const noticias = await Noticia.find()
        return res.status(200).json({
            data: noticias
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}
