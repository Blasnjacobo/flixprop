import { useRef, useState, useEffect } from 'react';
import { Universo as universoType } from '../../types/Universos';
import universosBanner from '../../assets/Noticias/noticias-banner-section.jpg';
import { useNavigate } from "react-router-dom";

interface universosPromp {
  universos: universoType[]
  text: string
}

const HomeUniversos = ({ text, universos }: universosPromp) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const navigate = useNavigate()

  useEffect(() => {
    setOffset(0);
  }, [universos]);

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      const activeUniversos = universos.filter((element) => element.activo === "TRUE");
      let newOffset = offset - displayCount;
      if (newOffset < 0) {
        newOffset = activeUniversos.length - (activeUniversos.length % displayCount || displayCount);
        if (newOffset === activeUniversos.length) {
          newOffset -= displayCount;
        }
      }
      setOffset(newOffset);
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      const activeUniversos = universos.filter((element) => element.activo === "TRUE");
      let newOffset = offset + displayCount;
      if (newOffset >= activeUniversos.length) {
        newOffset = 0;
      }
      setOffset(newOffset);
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setHasScrolled(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null && containerRef.current && !hasScrolled) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchMoveX - touchStartX;
      const direction = deltaX > 0 ? -1 : 1;

      if (Math.abs(deltaX) > 100) {
        const displayCount = getDisplayCount();
        let newOffset = offset + direction * displayCount;
        const activeUniversos = universos.filter((element) => element.activo === "TRUE");

        if (newOffset < 0) {
          newOffset = activeUniversos.length - (activeUniversos.length % displayCount || displayCount);
          if (newOffset === activeUniversos.length) {
            newOffset -= displayCount;
          }
        } else if (newOffset >= activeUniversos.length) {
          newOffset = 0;
        }

        setOffset(newOffset);
        setTouchStartX(null);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleCardClick = (universo: universoType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/universos/${universo.codigo}`)
  };

  const handleVerTodos = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/universos`);
  }

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 4 : 3;
  };

  const activeUniversos = universos.filter((element) => element.activo === "TRUE");

  const currentPage = Math.floor(offset / getDisplayCount()) + 1;
  const totalPages = Math.ceil(activeUniversos.length / getDisplayCount());

  return (
    <div className='home-universo-section'>
      <div className='home-universo-container'>
        <img src={universosBanner} alt="Universos Banner" className="home-universo-banner-image" />
        <section
          className='home-universo-main'
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className='home-universo-titleVerMas'>
            <h3>{text}</h3>
            <p onClick={handleVerTodos}>Ver Todos</p>
          </div>
          <div className='home-universo-mainCards'>
            {activeUniversos.slice(offset, offset + getDisplayCount()).map((universo) => (
              <div className='home-universo-card' key={universo.codigo} onClick={() => handleCardClick(universo)}>
                <img src={universo.url} alt={universo.universo} />
              </div>
            ))}
          </div>
          <div className='home-universo-scroll-arrows'>
            <button className='home-universo-scroll-left' onClick={scrollLeft}>
              <i className="bi bi-caret-left"></i>
            </button>
            <div className='home-universo-cardsCount'>
              {currentPage} / {totalPages}
            </div>
            <button className='home-universo-scroll-right' onClick={scrollRight}>
              <i className="bi bi-caret-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeUniversos;
