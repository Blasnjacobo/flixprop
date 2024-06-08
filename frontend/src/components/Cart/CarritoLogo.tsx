import { Button } from 'react-bootstrap';
import useCart from '../../context/Cart/useCart';
import { useEffect } from 'react';

interface CarritoProps {
    windowWidth: number
  }

const CarritoLogo = ({windowWidth}: CarritoProps) => {
    const { openCart, quantity } = useCart();

    useEffect(() => {
        console.log('Quantity changed:', quantity);
    }, [quantity]);

    console.log('Render Quantity:', quantity);
    return (
        <div>
            <Button
                onClick={openCart}
                style={{ width: '2.5rem', height: '2.5rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                variant='outline-black'
                className='rounded-circle'
            >
                <i className="bi bi-cart" style={{ color: 'white', paddingRight: windowWidth > 990 ? '15px' : '0' }}></i>
                {
                    quantity > 0 && (
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
                    )
                }
            </Button>
        </div>
    );
}

export default CarritoLogo;
