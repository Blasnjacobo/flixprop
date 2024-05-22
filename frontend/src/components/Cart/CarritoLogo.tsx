import { Button } from 'react-bootstrap';
import useCart from '../../context/Cart/useCart';
import { useEffect } from 'react';

const CarritoLogo = () => {
    const { openCart, quantity } = useCart();

    useEffect(() => {
        // console.log('Quantity changed:', quantity);
    }, [quantity]);

    return (
        <div>
            <div>
                    <Button
                        onClick={openCart}
                        style={{ width: '2.5rem', height: '2.5rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        variant='outline-black'
                        className='rounded-circle'
                    >
                        <i className="bi bi-bag" style={{ color: 'white' }}></i>
                        <div className='rounded-circle bg-dark-red d-flex justify-content-center align-items-center'
                            style={{
                                color: 'white',
                                width: '1.5rem',
                                height: '1.5rem',
                                position: 'absolute',
                                bottom: 28,
                                right: 4,
                                transform: 'translate(35%, 35%)',
                            }}
                        >
                            {quantity}
                        </div>
                    </Button>
            </div>
        </div>
    );
}

export default CarritoLogo;
