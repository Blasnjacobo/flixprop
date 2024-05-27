const express = require("express")
const { postSessions } = require("../controllers/postSessions")
const router = express.Router()

router.post("/create-checkout-session", postSessions)

module.exports = router