const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { Producto } = require("../models/producto.js");

module.exports.postSessions = async (req, res) => {
    try {
        const { cartItem } = req.body;

        const productoPromises = cartItem.map(async (item) => {
            const codigo = item.producto.slice(0, 10);  // Assuming the product code is the first 10 characters
            const producto = await Producto.findOne({ codigo: codigo });
            return { producto, talla: item.producto.slice(11) };  // Extracting the talla from the item
        });

        const productosWithTalla = await Promise.all(productoPromises);

        const lineItems = productosWithTalla.map(({ producto, talla }, index) => {
            console.log(talla)
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
                        images: [producto.imgProducto],
                        metadata: {
                            talla: talla
                        }
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
