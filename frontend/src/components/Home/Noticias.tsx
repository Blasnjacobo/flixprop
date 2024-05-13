import { useRef, useState, useEffect } from 'react';
// import noticias from '../../assets/Noticias/noticias.json';
import useNoticias from '../../context/Noticias/useNoticias';

const Noticias = () => {
  const { noticias } = useNoticias()
  console.log(noticias)
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState(0); // Offset for determining which items to display
  const scrollSpeed = 320; // Adjust the scroll speed as needed

  useEffect(() => {
    // Reset offset when noticias changes to ensure proper display
    setOffset(0);
  }, [noticias]);

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft -= scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds

      // Adjust offset to display previous set of items
      if (offset > 0) {
        setOffset(offset - 1);
      }
    }
  };

  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft += scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds

      // Adjust offset to display next set of items
      if (offset < noticias.length - 3) {
        setOffset(offset + 1);
      }
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

  const handleCardClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <div className='home-noticias'>
      <div className='home-noticias-container'>
        <section className='home-noticias-title'>
          <h2>NOTICIAS</h2>
        </section>
        <section className='home-noticias-main' ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {noticias.slice(offset, offset + 3).map((noticia) => (
            <div className='noticias-card' key={noticia.codigo} onClick={() => handleCardClick(noticia.img)}>
              <img src={noticia.img} alt={noticia.universo} />
              <div className='noticias-card-description'>
                <h3 className='noticias-universo-card'>{noticia.universo}</h3>
                <h4 className='noticias-titulo-card'>{noticia.titulo}</h4>
              </div>
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

export default Noticias;
