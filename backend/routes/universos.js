const express = require("express")
const { getAllUniversos } = require("../controllers/getAllUniversos")
const router = express.Router()

router.get("/", getAllUniversos)

module.exports = router