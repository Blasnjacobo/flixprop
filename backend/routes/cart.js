const express = require("express");
const totalQuantity = require("../controllers/cart/totalQuantity");
const itemQuantity = require("../controllers/cart/itemQuantity");
const increaseQuantity = require("../controllers/cart/increaseQuantity");
const decreaseQuantity = require("../controllers/cart/decreaseQuantity");
const removeFromCart = require("../controllers/cart/removeFromCart");
const cartItems = require("../controllers/cart/cartItems");
// const authenticateToken = require("../middleware/auth.js");

const router = express.Router();
router.get("/totalQuantity/:username", totalQuantity);
router.get("/itemQuantity/:username/:codigo",  itemQuantity);
router.post("/increase/:codigo/:username", increaseQuantity);
router.post("/decrease/:codigo/:username", decreaseQuantity);
router.delete("/delete/:codigo/:username",  removeFromCart);
router.get("/:username", cartItems);

module.exports = router;
