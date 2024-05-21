/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import useUser from '../../context/Users/useUser';
import { Producto } from "../../types/Productos";
import useCart from '../../context/Cart/useCart';

interface StoreItemProps {
    producto: Producto;
}

const Productos = ({ producto }: StoreItemProps) => {
    const {
        codigo,
        nombre,
        universo,
        link,
        vendedor,
        precio,
        imgProducto,
        imgEscena    } = producto;

    const user = useUser();
    console.log(user);

    const {
        itemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        const fetchQuantity = async () => {
            if (user) {
                try {
                    const result = await itemQuantity(codigo, user.username);
                    setQuantity(result);
                } catch (error) {
                    console.error("Error fetching quantity:", error);
                }
            }
        };
        fetchQuantity();
    }, [user, codigo, itemQuantity, increaseQuantity]);

    const handleIncreaseQuantity = async () => {
        if (user) {
            try {
                await increaseQuantity(codigo, user.username);
                const updatedQuantity = await itemQuantity(codigo, user.username);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error("Error increasing quantity:", error);
            }
        }
    };

    const handleDecreaseQuantity = async () => {
        if (user) {
            try {
                await decreaseQuantity(codigo, user.username);
                const updatedQuantity = await itemQuantity(codigo, user.username);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        }
    };

    const handleRemoveFromCart = async () => {
        if (user) {
            try {
                await removeFromCart(codigo, user.username);
                const updatedQuantity = await itemQuantity(codigo, user.username);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const handleCardClick = (link: string, vendedor: string, codigo: string) => {
        if (vendedor === 'Flixprop') {
            link = codigo
        }
        window.location.href = link;
    };

    const handleImageTouchStart = (e: React.TouchEvent<HTMLImageElement>, imgEscena: string) => {
        e.currentTarget.src = imgEscena;
    };

    const handleImageTouchEnd = (e: React.TouchEvent<HTMLImageElement>, imgProducto: string) => {
        e.currentTarget.src = imgProducto;
    };

    return (
        <div className='productos-card' key={codigo}>
            <h3 className='productos-universo-card'>{universo}</h3>
            <img
                alt={universo}
                src={imgProducto}
                onMouseOver={(e) => { e.currentTarget.src = imgEscena }}
                onMouseOut={(e) => { e.currentTarget.src = imgProducto }}
                onTouchStart={(e) => handleImageTouchStart(e, imgEscena)}
                onTouchEnd={(e) => handleImageTouchEnd(e, imgProducto)}
                onTouchCancel={(e) => handleImageTouchEnd(e, imgProducto)}
                onClick={() => handleCardClick(link, vendedor, codigo)}
            />
            <div className='productos-info'>
                <div className='productos-titulo-card'>{nombre}</div>
                <div className='productos-provedor-card'>{vendedor}</div>
                <div className='productos-precio-card'>${precio}.00 MXN</div>
            </div>
            {(user && vendedor === 'Flixprop') && (
                <div className="productos-actions">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={handleIncreaseQuantity}>
                            + Añadir al carrito <i className="bi bi-cart"></i>
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: '0.5rem' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                <Button style={{ width: '40px', borderRadius: '10px'}} onClick={handleDecreaseQuantity}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> en el <i className="bi bi-cart"></i>
                                </div>
                                <Button style={{ width: '40px', borderRadius: '10px'}} onClick={handleIncreaseQuantity}>+</Button>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                style={{ borderRadius: 10 }}
                                onClick={handleRemoveFromCart}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            )}
            {(user && vendedor !== 'Flixprop') && (
                <div className="productos-actions" style={{ margin:'0 auto' }}>
                   Ir a producto
                </div>
            )}
        </div>
    );
};

export default Productos;
