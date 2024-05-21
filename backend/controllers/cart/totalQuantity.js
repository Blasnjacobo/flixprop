const Cart = require("../../models/cart");

const totalQuantity = async (request, response) => {
  try {
    const { username } = request.params;
    const cart = await Cart.findOne({ username: username });
    if (!cart) {
      return response.status(404).json({ message: "Cart not found for user" });
    }
    let total = cart.items.reduce(
      (accum, currentValue) => accum + currentValue.quantity,
      0
    );
    return response.status(200).json(total);
  } catch (error) {
    console.log("Error for totalQuantity", error);
    response.status(500).send({ message: error.message });
  }
};

module.exports = totalQuantity;
