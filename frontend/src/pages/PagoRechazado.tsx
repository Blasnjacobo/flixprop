import { useEffect, useState } from 'react';
import flixprop from './../assets/flixprop-logo.png';

const PagoRechazado = () => {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 990);
    };

    handleResize(); // Initial call to set initial screen size
    window.addEventListener('resize', handleResize); // Add event listener to track window resize

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
            <p style={{ color: 'black', fontSize: '1.5rem', marginBottom: '1rem' }}>¡Pago Rechazado!</p>
            <img src={flixprop} alt="Not Found Image" style={{ width: '100%', height: 'auto' }} />
            <p style={{ color: 'black', textAlign: 'center', fontSize: '1rem', marginTop: '1rem' }}>Su pago se ha sido rechazado, compruebe que su cuenta tenga fondos, si es asi contactanos</p>
          </div>
        </div>
        {/* Second column */}
        <div style={{ flex: '1', width: '50%', margin: 'auto' }}>
          <img
            src='https://w7.pngwing.com/pngs/642/266/png-transparent-rejected-remove-not-approved-not-accepted-cancel-canceled-3d-icon-thumbnail.png'
            alt="Rejected Image"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PagoRechazado;