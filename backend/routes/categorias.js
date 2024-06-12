const express = require("express")
const { getAllCategorias } = require("../controllers/getAllCategotias")
const router = express.Router()

router.get("/", getAllCategorias)

module.exports = router