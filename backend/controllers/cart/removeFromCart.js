const Cart = require('../../models/cart')

const removeFromCart = async (req, res) => {
    try {
        const { codigo, username } = req.params;
        const cart = await Cart.findOne({ username: username });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for user' });
        }
        let item = cart.items.find(item => item.producto === codigo);
        if (!item) {
            console.log('No item found')
        } else {
            cart.items = cart.items.filter(item => item.producto !== codigo)
        }
        await cart.save();
        res.status(200).json(item.quantity);
    } catch(error) {
        console.log('Error removing item', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = removeFromCart;