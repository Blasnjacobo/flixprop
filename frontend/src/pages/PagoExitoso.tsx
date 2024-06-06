import { useEffect, useState } from 'react';
import flixprop from './../assets/flixprop-logo.png';

const PagoExitoso = () => {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 990);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '80vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: 'auto' }}>
      {/* Column container */}
      <div style={{ display: 'flex', flexDirection: isWideScreen ? 'row' : 'column' }}>
        {/* First column */}
        <div style={{ flex: '2', textAlign: 'center', marginBottom: isWideScreen ? '0' : '2rem', marginTop: '1rem'}}>
          <div style={{ width: '70%', margin: 'auto' }}>
            <p style={{ color: 'black', fontSize: '1.5rem', marginBottom: '1rem' }}>¡Pago Exitoso!</p>
            <img src={flixprop} alt="Not Found Image" style={{ width: '100%', height: 'auto' }} />
            <p style={{ color: 'black', textAlign: 'center', fontSize: '1rem', marginTop: '1rem' }}>Su pago se ha realizado exitosamente, a la brevedad recibira un correo con su comprobante de pago y una descripcion sobre sus articulos</p>
          </div>
        </div>
        {/* Second column */}
        <div style={{ flex: '1', width: '50%', margin: 'auto' }}>
          <img
            src='https://jumpseller.s3.eu-west-1.amazonaws.com/store/chaac/assets/check.png'
            alt="Successful Image"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;