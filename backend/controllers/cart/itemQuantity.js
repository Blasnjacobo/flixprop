const Cart = require("../../models/cart");

const itemQuantity = async (req, res) => {
  try {
    const { username, codigo } = req.params;
    const cart = await Cart.findOne({ username: username });
    if (!cart) {
      console.log("Cart not found for user:", username, " itemQuantity");
      return res.status(404).json({ message: "Cart not found" });
    }
    let totalQuantity = 0;

    if (cart.items) {
      cart.items.forEach((item) => {
        if (item.producto === codigo) {
          totalQuantity += item.quantity;
        }
      });
    }
    res.status(200).json({ totalQuantity });
  } catch (error) {
    console.log("Error for itemQuantity", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = itemQuantity;
