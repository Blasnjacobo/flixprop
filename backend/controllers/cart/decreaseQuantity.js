const Cart = require('../../models/cart');

const decreaseQuantity = async (req, res) => {
    try {
        const { codigo, username } = req.params;
        const cart = await Cart.findOne({ username: username });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for user' });
        }     
        const itemIndex = cart.items.findIndex(item => item.producto === codigo);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        const item = cart.items[itemIndex];
        if (item.quantity === 1) {
            cart.items.splice(itemIndex, 1);
        } else {
            item.quantity -= 1;
        }
        await cart.save();
        res.status(200).json(1);
    } catch(error) {
        console.log('Error decreasing quantity', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = decreaseQuantity;
