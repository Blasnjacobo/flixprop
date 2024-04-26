import { useRef } from 'react';
import noticias from '../../assets/Noticias/noticias.json'
const Noticias = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft -= 320;
      }
    };
  
    const scrollRight = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 320;
      }
    };
  
    return (
      <div className='home-noticias'>
        <div className='home-noticias-container'>
          <section className='home-noticias-title'>
            <h2>NOTICIAS</h2>
          </section>
          <section className='home-noticias-main' ref={containerRef}>
            {noticias.map((noticia) => (
              <div className='noticias-card' key={noticia.id}>
                <img src={noticia.img} alt={noticia.universo} />
                <h3 className='noticias-universo-card'>{noticia.universo}</h3>
                <div className='noticias-titulo-card'>{noticia.titulo}</div>
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
}

export default Noticias
