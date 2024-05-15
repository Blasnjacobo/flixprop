const express = require("express")
const { getAllNoticias } = require("../controllers/getAllNoticias")
const router = express.Router()

router.get("/", getAllNoticias)

module.exports = router