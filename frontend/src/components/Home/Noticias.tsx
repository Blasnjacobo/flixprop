import { useRef, useState, useEffect } from 'react';
// import noticias from '../../assets/Noticias/noticias.json';
import useNoticias from '../../context/Noticias/useNoticias';
import type { Noticia as NoticiaType } from '../../types/Noticias';
import { useNavigate } from 'react-router-dom';


const Noticias = () => {
  const { noticias } = useNoticias()
  console.log(noticias)
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState(0); 
  const scrollSpeed = 320; 
  const navigate = useNavigate();

  useEffect(() => {
    setOffset(0);
  }, [noticias]);

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft -= scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500);

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
      }, 500);

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
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 3 : 1;
  };

  const lastIndexDisplayed = Math.min(offset + getDisplayCount(), noticias.length);

  const handleCardClickSlider = (noticia: NoticiaType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/flixprop/noticias/${noticia.codigo}`);
  };

  return (
    <div className='home-noticias-section'>
      <div className='home-noticias-container'>
        <h3 className='home-noticias-container-text'>Noticias</h3>
        <section className='home-noticias-main' ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {noticias.slice(offset, offset + 3).map((noticia) => (
            <div className='home-noticias-card' key={noticia.codigo} onClick={() => handleCardClickSlider(noticia)}>
              <img src={noticia.img} alt={noticia.universo} />
              <div className='home-noticias-card-description'>
                <h6 className='home-noticias-universo-card'>{noticia.universo}</h6>
                <h6 className='home-noticias-titulo-card'>{noticia.titulo}</h6>
              </div>
            </div>
          ))}
        </section>
        <div className='scroll-arrows'>
          <button className='scroll-left' onClick={scrollLeft}><i className="bi bi-caret-left"></i></button>
          {getDisplayCount() === 3 ? (
            <div className='home-noticias-cardsCount'>
              {lastIndexDisplayed} / {noticias.length}
            </div>
          ) : (
            <div className='home-noticias-cardsCount'>
              {lastIndexDisplayed + 2} / {noticias.length}
            </div>
          )}
          <button className='scroll-right' onClick={scrollRight}><i className="bi bi-caret-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Noticias;
