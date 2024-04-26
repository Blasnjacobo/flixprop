import { useRef } from 'react';
import universos from '../../assets/Universos/universos.json';

const Universos = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className='home-universo'>
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
