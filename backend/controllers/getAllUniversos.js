const { Universo } = require("../models/universo.js")

module.exports.getAllUniversos = async (req, res) => {
    try {
        const universos = await Universo.find()
        console.log(universos)
        return res.status(200).json({
            data: universos
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
}
