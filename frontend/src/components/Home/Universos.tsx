import { useRef, useState, useEffect } from 'react';
import useUniverso from '../../context/Universos/useUniversos';
import universosBanner from '../../assets/Noticias/noticias-banner-section.jpg';
import { useNavigate } from "react-router-dom";

const Universos = () => {
  const { universos } = useUniverso();
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
        newOffset = newOffset % activeUniversos.length; // Wrap to the start
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

  const handleCardClick = (index: number) => {
    const newIndex = (index + 1) % universos.length;
    setOffset(newIndex);
  };

  const handleVerTodos = () => {
    navigate(`/flixprop/universos`);
  }

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 4 : 1;
  };

  const activeUniversos = universos.filter((element) => element.activo === "TRUE");

  return (
    <div className='home-universoPage-section'>
      <div className='home-universoPage-container'>
        <img src={universosBanner} alt="Universos Banner" className="universosPage-banner-image" />
        <section
          className='home-universo-main'
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className='home-universoPage-titleVerMas'>
            <h3>Universos</h3>
            <p onClick={handleVerTodos}>Ver Todos</p>
          </div>
          <div className='home-universoPage-mainCards'>
            {activeUniversos.slice(offset, offset + getDisplayCount()).map((universo, index) => (
              <a href="https://flixprop.com/" className='home-universo-card' key={universo.codigo} onClick={() => handleCardClick(index)}>
                <img src={universo.url} alt={universo.universo} />
                <div>{universo.universo}</div>
              </a>
            ))}
          </div>
          <div className='scroll-arrows'>
            <button className='scroll-left' onClick={scrollLeft}>
              <i className="bi bi-caret-left"></i>
            </button>
            <div className='home-universoPage-cardsCount'>
              {Math.ceil(offset / getDisplayCount()) + 1} / {Math.ceil(activeUniversos.length / getDisplayCount())}
            </div>
            <button className='scroll-right' onClick={scrollRight}>
              <i className="bi bi-caret-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Universos;
