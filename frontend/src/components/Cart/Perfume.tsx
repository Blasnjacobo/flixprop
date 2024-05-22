import { useState, useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "../../utilities/formatCurrency"
import useShoppingCart from "../../context/Cart/useShoppingCart"
import useUser from '../../context/Users/useUser';

interface StoreItemProps {
    _id: string;
    name: string;
    price: number;
    type: string;
    aroma: string;
    categoria: string;
    imgUrl: string;
}

const Perfume = ({ _id, name, price, imgUrl }: StoreItemProps) => {
    const navigate = useNavigate();
    const user = useUser();

    const handleItem = () => {
        if (_id) {
            navigate(`/shopping-cart/${_id}`);
        }
    }

    const {
        itemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useShoppingCart()

    // Use async/await to resolve the promise
    const getQuantity = async () => {
        if (user) {
            return await itemQuantity(_id, user.username);
        }
        return 0;
    }

    // Render the component asynchronously
    const [quantity, setQuantity] = useState<number | null>(null);

    useEffect(() => {
        getQuantity().then((result) => {
            setQuantity(result);
        }).catch((error) => {
            console.error("Error fetching quantity:", error);
            setQuantity(0);
        });
    }, [increaseQuantity, decreaseQuantity, removeFromCart]);

    if (quantity === null) {
        return <div></div>;
    }

    const handleIncreaseQuantity = async () => {
        if (user) {
            await increaseQuantity(_id, user.username)
            const updatedQuantity = await getQuantity()
            await setQuantity(updatedQuantity)
        }
    }

    const handleDecreaseQuantity = async () => {
        if (user) {
            await decreaseQuantity(_id, user.username)
            const updatedQuantity = await getQuantity()
            await setQuantity(updatedQuantity)
        }
    }

    const handleRemoveFromCart = async () => {
        if (user) {
            await removeFromCart(_id, user.username)
            const updatedQuantity = await getQuantity()
            await setQuantity(updatedQuantity)
        }
    }

    return (
        <Card className="h-100 m-3">
            <Card.Img
                variant="top"
                src={imgUrl}
                height='200px'
                style={{ objectFit: 'contain', marginTop: '1rem', cursor: 'pointer'}}
                onClick={() => handleItem()}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="flex-columns mb-2 gap-4 h-100"
                onClick={() => handleItem()} style={{ cursor: 'pointer'}}>
                    <span className="fs-0.5 w-100 text-center">{name}</span>
                    <div className="flex-center gap-5">
                        <h5 className="text-danger text-center w-100"><h6 className="text-dark">Precio de contado:</h6>{formatCurrency(price)}</h5>
                        <h5 className="text-center w-100"><h6>Precio a 10 pagos:</h6>{formatCurrency(price+500)}</h5>
                    </div>
                </Card.Title>
                {user ? (
                    <div className="w-100">
                        {quantity === 0 ? (
                            <Button className="w-100" onClick={handleIncreaseQuantity}>+ Añadir al carrito <i className="bi bi-cart"></i></Button>
                        ) : (
                            <div className="d-flex align-items-center flex-column" style={{ gap: '0.5rem' }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ gap: '0.5rem' }}>
                                    <Button onClick={handleDecreaseQuantity}>-</Button>
                                    <div>
                                        <span className="fs-3">{quantity} </span>
                                        en el <i className="bi bi-cart"></i>
                                    </div>
                                    <Button onClick={handleIncreaseQuantity}>+</Button>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    style={{ borderRadius: 10 }}
                                    onClick={handleRemoveFromCart}
                                >Remove</Button>
                            </div>
                        )}
                    </div>
                ) : <div></div>}
            </Card.Body>
        </Card>
    );
}

export default Perfume;
