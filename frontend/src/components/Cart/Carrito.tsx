// Carrito.tsx
import React, { useEffect, useState } from 'react';
import { Offcanvas, Stack, Button } from 'react-bootstrap';
import useShoppingCart from '../../context/Cart/useShoppingCart';
import usePerfumes from '../../context/Perfumes/usePerfumes';
import useUser from '../../context/Users/useUser';
import { formatCurrency } from '../../utilities/formatCurrency';
import CarritoItem from './CarritoItem';

type ShoppingCartProps = {
    isOpen: boolean;
}

interface ShoppingCartItem {
    perfumeID: string;
    quantity: number;
}

const Carrito = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useShoppingCart();
    const [cartItem, setCartItem] = useState<ShoppingCartItem[]>([]);
    const [triggerEffect, setTriggerEffect] = useState(false);
    const [increasePrice, setIncreasePrice] = useState(false); // State to track checkbox status
    const { perfumes } = usePerfumes();
    const user = useUser();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (user) {
                const items = await cartItems(user.username);
                setCartItem(items);
            } else {
                setCartItem([]);
            }
        };

        fetchCartItems();
    }, [user, cartItems, triggerEffect, increaseQuantity, decreaseQuantity, removeFromCart]);

    // Function to handle sending WhatsApp message
    const sendWhatsAppMessage = () => {
        let message = "Cart  Details:\n";

        cartItem?.forEach(item => {
            const storeItem = perfumes.find(i => i._id === item.perfumeID);
            if (storeItem) {
                message += `${storeItem.name}: ${item.quantity} x ${formatCurrency(storeItem.price)}\n`;
            }
        });

        const total = cartItem?.reduce((total, cartItem) => {
            const storeItem = perfumes.find(i => i._id === cartItem.perfumeID);
            return total + (storeItem?.price || 0) * cartItem.quantity;
        }, 0);

        cartItem ? message += `\nTotal: ${formatCurrency(total)}` : ''

        const whatsappURL = `https://api.whatsapp.com/send?phone=17789176729&text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    };

    // Toggle increasePrice state when checkbox is clicked
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncreasePrice(event.target.checked);
    };

    return (
        <Offcanvas
            show={isOpen}
            onHide={closeCart}
            placement='end'
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItem?.map(item => (
                        <CarritoItem key={item.perfumeID} {...item}
                            triggerEffect={triggerEffect} setTriggerEffect={setTriggerEffect} increasePrice={increasePrice} perfumes={perfumes} />
                    ))}
                    <div className='ms-auto fw-bold fs-5'>
                        Total {' '}
                        {formatCurrency(
                            cartItem.reduce((total, cartItem) => {
                                const item = perfumes.find(i => i._id === cartItem.perfumeID)
                                const itemPrice = item ? (increasePrice ? item.price + 500 : item.price) : 0;
                                return total + (itemPrice || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                    <label>
                        <input type="checkbox" id="myCheckbox" className='checkbox-cart' onChange={handleCheckboxChange} />
                        Perfumes a 10 pagos
                    </label>
                    <Button variant="primary" onClick={sendWhatsAppMessage}>Send WhatsApp Message</Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Carrito;
