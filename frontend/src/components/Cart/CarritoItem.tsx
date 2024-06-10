import { useState, useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import useCart from '../../context/Cart/useCart';
import useUser from '../../context/Users/useUser';
import { Producto } from '../../types/Productos';
import { useNavigate } from 'react-router-dom';

type CartItemProps = {
    producto: string;
    quantity: number;
    Productos: Producto[];

};

const CarritoItem = ({ producto, quantity, Productos }: CartItemProps) => {
    const user = useUser();
    const navigate = useNavigate();
    const { removeFromCart, increaseQuantity, decreaseQuantity, itemQuantity, triggerEffect, setTriggerEffect } = useCart();
    const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

    useEffect(() => {
        setUpdatedQuantity(quantity);
    }, [quantity]);

    const item = Productos.find(i => i.codigo === producto.slice(0, 10));
    if (!item) return null;
    const talla = producto.slice(11, producto.length);

    const handleIncreaseQuantity = async () => {
        await increaseQuantity(producto, user?.username || '');
        const updatedQty = await itemQuantity(producto, user?.username || '');
        setUpdatedQuantity(updatedQty);
        setTriggerEffect(!triggerEffect)
    };

    const handleDecreaseQuantity = async () => {
        await decreaseQuantity(producto, user?.username || '');
        const updatedQty = await itemQuantity(producto, user?.username || '');
        setUpdatedQuantity(updatedQty);
        setTriggerEffect(!triggerEffect)
    };

    const handleRemoveFromCart = async () => {
        await removeFromCart(producto, user?.username || '');
        const updatedQty = await itemQuantity(producto, user?.username || '');
        setUpdatedQuantity(updatedQty);
        setTriggerEffect(!triggerEffect)
    };

    const totalPrice = Number(item.precio) * updatedQuantity;

    const handleCardClick = () => {
        navigate(`/flixprop/productos/${item.codigo}`);
    };

    return (
        updatedQuantity > 0 ? (
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                <img 
                    src={item.imgProducto} 
                    onClick={handleCardClick} 
                    style={{ width: '100px', height: '100px', objectFit: 'fill', cursor: 'pointer' }} 
                />
                <div className="me-auto">
                    <div style={{ fontSize: '12px', cursor:  'pointer' }} onClick={handleCardClick} >
                        {item.nombre}{' '}
                        {updatedQuantity > 1 && (
                            <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                x{updatedQuantity}
                            </span>
                        )}
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        ${item.precio}.00 MXN
                    </div>
                    {(talla !== 'NON') && <div>{`Talla: ${producto.slice(11)}`}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                    <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', width: '80px' }}>${totalPrice}.00 MXN</div>
                        <Button variant="outline-danger" size="sm" style={{ height: '2rem' }} onClick={handleRemoveFromCart}>
                            x
                        </Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5vw' }}>
                        <Button size="sm" style={{ fontSize: '15px', backgroundColor: 'red', border: '0px' }} onClick={handleIncreaseQuantity}>
                            +
                        </Button>
                        <Button size="sm" style={{ fontSize: '15px', backgroundColor: 'red', border: '0px' }} onClick={handleDecreaseQuantity}>
                            -
                        </Button>
                    </div>
                </div>
            </Stack>
        ) : null
    );
};

export default CarritoItem;
