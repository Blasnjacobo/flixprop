import { useRef } from 'react';
import universos from '../../assets/Universos/universos.json';

const Universos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left detected, scroll left
      scrollLeft();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right detected, scroll right
      scrollRight();
    }
  };

  return (
    <div className='home-universo' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className='home-universo-container'>
        <section className='home-universo-title'>
          <h2>UNIVERSOS</h2>
        </section>
        <section className='home-universo-main' ref={containerRef}>
          {universos.map((universo) => (
            <div className='universo-card' key={universo.id}>
              <img src={universo.img} alt={universo.name} />
              <div>{universo.name}</div>
            </div>
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
