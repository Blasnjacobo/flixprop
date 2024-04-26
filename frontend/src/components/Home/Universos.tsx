import { useRef, useState } from 'react';
import universos from '../../assets/Universos/universos.json';

const Universos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null && containerRef.current) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchStartX - touchMoveX;
      if (deltaX > 0) {
        containerRef.current.scrollLeft += 300;
      } else {
        containerRef.current.scrollLeft -= 300;
      }
      setTouchStartX(touchMoveX);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div className='home-universo'>
      <div className='home-universo-container'>
        <section className='home-universo-title'>
          <h2>UNIVERSOS</h2>
        </section>
        <section className='home-universo-main' ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {universos.map((universo) => (
            <div className='universo-card' key={universo.id}>
              <img src={universo.img} alt={universo.name} />
              <div>{universo.name}</div>
            </div>
          ))}
        </section>
      </div>
      <div className='scroll-arrows'>
        <button className='scroll-left' onClick={scrollLeft}><i className="bi bi-caret-left"></i></button>
        <div>Flixprop</div>
        <button className='scroll-right' onClick={scrollRight}><i className="bi bi-caret-right"></i></button>
      </div>
    </div>
  );
};

export default Universos;
