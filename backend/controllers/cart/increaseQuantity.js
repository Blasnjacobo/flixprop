const Cart = require('../../models/cart');

const increaseQuantity = async (req, res) => {
    try {
        const { codigo, username } = req.params;
        const cart = await Cart.findOne({ username: username });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for user' });
        }

        let item = cart.items.find(item => item.producto === codigo);

        if (!item) {
            cart.items.push({ producto: codigo, quantity: 1 });
            await cart.save();
            item = cart.items.find(item => item.producto === codigo);
        } else {
            item.quantity += 1;
            await cart.save();
        }

        res.status(200).json(1);
    } catch(error) {
        console.log('Error incrementing quantity', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = increaseQuantity;