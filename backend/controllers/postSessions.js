const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { Producto } = require("../models/producto.js");

module.exports.postSessions = async (req, res) => {
    try {
        const { cartItem } = req.body;

        const productoPromises = cartItem.map(async (item) => {
            const codigo = item.producto.slice(0, 10);  // Extracting the product code
            const talla = item.producto.slice(11);  // Extracting the talla
            const producto = await Producto.findOne({ codigo: codigo });
            if (!producto) {
                throw new Error(`Product not found for code: ${codigo}`);
            }
            return { producto, talla };
        });

        const productosWithTalla = await Promise.all(productoPromises);

        const lineItems = productosWithTalla.map(({ producto, talla }, index) => {
            const item = cartItem[index];
            const unitAmount = parseFloat(producto.precio) * 100;
            if (isNaN(unitAmount)) {
                throw new Error(`Invalid precio value: ${producto.precio}`);
            }

            const name = talla === 'NON' ? producto.nombre : `${producto.nombre} (Talla: ${talla})`;
            if (!name) {
                throw new Error(`Missing product name for item at index ${index}`);
            }

            return {
                price_data: {
                    currency: "mxn",
                    product_data: {
                        name: name,
                        images: [producto.imgProducto],
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
            success_url: "https://flixprop.netlify.app/#/payment/success",
            cancel_url: "https://flixprop.netlify.app/#/payment/cancel"
        });

        res.json({ id: session.id });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};
