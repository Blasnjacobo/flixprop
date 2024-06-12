const express = require("express")
const { getAllCategorias } = require("../controllers/getAllCategorias")
const router = express.Router()

router.get("/", getAllCategorias)

module.exports = router