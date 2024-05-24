import { useEffect, useState } from 'react';
import { Offcanvas, Stack, Button } from 'react-bootstrap';
import useCart from '../../context/Cart/useCart';
import useProductos from '../../context/Productos/useProductos';
import useUser from '../../context/Users/useUser';
import CarritoItem from './CarritoItem';

type CartProps = {
    isOpen: boolean;
}

interface CartItem {
    producto: string;
    quantity: number;
}

const Carrito = ({ isOpen }: CartProps) => {
    const { closeCart, cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const [cartItem, setCartItem] = useState<CartItem[]>([]);
    const { productos } = useProductos();
    const user = useUser();

    useEffect(() => {
        const fetchCartItems = async () => {
            let items: CartItem[] = [];
            if (user) {
                items = await cartItems(user.username);
            } else {
                items = await cartItems();
            }
            setCartItem(items);
        };

        fetchCartItems();
    }, [user, cartItems, increaseQuantity, decreaseQuantity, removeFromCart]);

    console.log(cartItem)

    return (
        <Offcanvas
            show={isOpen}
            onHide={closeCart}
            placement='end'
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItem?.map(item => (
                        <CarritoItem {...item} Productos={productos} />
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
                    {
                        (cartItem.length > 0) && (
                            <Button variant="danger">Pagar</Button>
                        )
                    }
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Carrito;
