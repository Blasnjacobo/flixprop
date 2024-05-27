const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { Producto } = require("../models/producto.js");

module.exports.postSessions = async (req, res) => {
    try {
        const { cartItem } = req.body;
        console.log(cartItem);

        const productoPromises = cartItem.map(async (item) => {
            const producto = await Producto.findOne({ codigo: item.producto });
            return producto;
        });

        const productos = await Promise.all(productoPromises);
        console.log(productos)

        const lineItems = productos.map((producto, index) => {
            const item = cartItem[index];
            const unitAmount = parseFloat(producto.precio) * 100;
            if (isNaN(unitAmount)) {
                throw new Error(`Invalid precio value: ${producto.precio}`);
            }
        
            return {
                price_data: {
                    currency: "mxn",
                    product_data: {
                        name: producto.nombre,
                        images: [producto.imgProducto]
                    },
                    unit_amount: unitAmount
                },
                quantity: item.quantity
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/flixprop/payment/success",
            cancel_url: "http://localhost:5173/flixprop/payment/rejected"
        });

        res.json({ id: session.id });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
