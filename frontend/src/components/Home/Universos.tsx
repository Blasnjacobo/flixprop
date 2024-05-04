import { useRef, useState } from 'react';
// import universos from '../../assets/Universos/universos.json';
import useUniverso from '../../context/Universos/useUniversos'
import { NavLink } from 'react-router-dom';


const Universos = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { universos } = useUniverso()
  console.log(universos)
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const scrollSpeed = 300; // Adjust the scroll speed as needed

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft -= scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds
    }
  };

  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft += scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setHasScrolled(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null && containerRef.current && !hasScrolled) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchStartX - touchMoveX;
      if (deltaX > 0) {
        containerRef.current.scrollLeft += scrollSpeed;
      } else {
        containerRef.current.scrollLeft -= scrollSpeed;
      }
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleCardClick = () => {
    window.location.href = 'https://flixprop.com/';
  };

  return (
    <div className='home-universo'>
      <div className='home-universo-container'>
        <section className='home-universo-title'>
          <h2>UNIVERSOS</h2>
          <NavLink className='home-univeso-verTodo' to={'/flixprop/universos/'}>Ver Todos</NavLink>
        </section>
        <section className='home-universo-main' ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {universos.filter((element) => element.activo == "TRUE" ).map((universo) => (
            <a href="https://flixprop.com/" className='universo-card' key={universo.codigo} onClick={handleCardClick}>
              <img src={universo.url} alt={universo.universo} />
              <div>{universo.universo}</div>
            </a>
          ))}
        </section>
        <div className='scroll-arrows'>
          <button className='scroll-left' onClick={scrollLeft}><i className="bi bi-caret-left"></i></button>
          <div>Flixprop</div>
          <button className='scroll-right' onClick={scrollRight}><i className="bi bi-caret-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Universos;
