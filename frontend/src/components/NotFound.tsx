import { useEffect, useState } from 'react';
import flixprop from './../assets/flixprop-logo.png';

const NotFound = () => {
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
    <div style={{ height: '70vh', width: '80vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: 'auto' }}>
      {/* Column container */}
      <div style={{ display: 'flex', flexDirection: isWideScreen ? 'row' : 'column' }}>
        {/* First column */}
        <div style={{ flex: '2', textAlign: 'center', marginBottom: isWideScreen ? '0' : '2rem', marginTop: '1rem'}}>
          <div style={{ width: '70%', margin: 'auto' }}>
            <p style={{ color: 'black', fontSize: '1.5rem', marginBottom: '1rem' }}>La página solicitada no existe</p>
            <img src={flixprop} alt="Not Found Image" style={{ width: '100%', height: 'auto' }} />
            <p style={{ color: 'black', textAlign: 'center', fontSize: '1rem', marginTop: '1rem' }}>Ingresa correctamente el URL deseado, si el problema persiste favor de contactarnos</p>
          </div>
        </div>
        {/* Second column */}
        <div style={{ flex: '1' }}>
          <img
            src='https://static.vecteezy.com/system/resources/previews/008/568/882/original/website-page-not-found-error-404-robot-character-broken-chatbot-mascot-disabled-site-on-technical-work-web-design-template-cartoon-online-bot-crash-accident-robotic-assistance-failure-eps-vector.jpg'
            alt="Not Found Image"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;