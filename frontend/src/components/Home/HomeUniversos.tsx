import { useRef, useState, useEffect } from 'react';
import { Universo as universoType } from '../../types/Universos'
import universosBanner from '../../assets/Noticias/noticias-banner-section.jpg';
import { useNavigate } from "react-router-dom";

interface universosPromp {
  universos: universoType[]
}

const HomeUniversos = ({ universos }: universosPromp) => {
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
      let newOffset = offset - displayCount;
      if (newOffset < 0) {
        const activeUniversos = universos.filter((element) => element.activo === "TRUE");
        newOffset = activeUniversos.length - (Math.abs(newOffset) % activeUniversos.length || activeUniversos.length); // Wrap to the end
      }
      setOffset(newOffset);
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      let newOffset = offset + displayCount;
      const activeUniversos = universos.filter((element) => element.activo === "TRUE");
      if (newOffset >= activeUniversos.length) {
        newOffset = newOffset % activeUniversos.length;
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

        if (newOffset < 0) {
          newOffset = universos.length - (universos.length % displayCount || displayCount); // Wrap to the end
        } else if (newOffset >= universos.length) {
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
    navigate(`/flixprop/universos/${universo.codigo}`)
  };

  const handleVerTodos = () => {
    navigate(`/flixprop/universos`);
  }

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 4 : 1;
  };

  const activeUniversos = universos.filter((element) => element.activo === "TRUE");

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
            <h3>Universos</h3>
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
              {Math.ceil(offset / getDisplayCount()) + 1} / {Math.ceil(activeUniversos.length / getDisplayCount())}
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
