const express = require("express")
const { getAllProductos } = require("../controllers/getAllProductos")
const router = express.Router()

router.get("/", getAllProductos)

module.exports = router