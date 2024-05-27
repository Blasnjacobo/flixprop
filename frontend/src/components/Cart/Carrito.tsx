import { useEffect, useState } from 'react';
import { Offcanvas, Stack, Button } from 'react-bootstrap';
import useCart from '../../context/Cart/useCart';
import useProductos from '../../context/Productos/useProductos';
import useUser from '../../context/Users/useUser';
import CarritoItem from './CarritoItem';
import { loadStripe } from '@stripe/stripe-js';

type CartProps = {
    isOpen: boolean;
}

interface CartItem {
    producto: string;
    quantity: number;
}

const Carrito = ({ isOpen }: CartProps) => {
    const { closeCart, cartItems } = useCart();
    const [cartItem, setCartItem] = useState<CartItem[]>([]);
    const { productos } = useProductos();
    const user = useUser();

    useEffect(() => {
        const fetchCartItems = async () => {
            let items: CartItem[] = [];
            if (user) {
                items = await cartItems(user.username);
            } else {
                items = await cartItems('');
            }
            setCartItem(items);
        };

        fetchCartItems();
    }, [user, cartItems]);

    const makePayment = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

        if (!stripe) {
            console.error("Stripe failed to load");
            return;
        }

        const body = {
            cartItem: cartItem
        };

        console.log('body: ' + body)

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch('https://flixprop-production.up.railway.app/payments/create-checkout-session', {
            // const response = await fetch('http://localhost:5000/payments/create-checkout-session', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                console.error("Failed to create checkout session");
                return;
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItem?.map(item => (
                        <CarritoItem {...item} Productos={productos} key={item.producto} />
                    ))}
                    <div className='ms-auto fw-bold fs-5'>
                        Total {' '}
                        ${(
                            cartItem.reduce((total, cartItem) => {
                                const storeItem = productos.find(i => i.codigo === cartItem.producto);
                                const itemPrecio = storeItem ? Number(storeItem.precio) : 0; // Convert precio to number
                                return total + (itemPrecio * cartItem.quantity);
                            }, 0)
                        )}.00 MXN
                    </div>
                    {cartItem.length > 0 && (
                        <Button variant="danger" onClick={makePayment}>Pagar</Button>
                    )}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Carrito;
