import type { Categoria as CategoriaType } from '../../types/Categorias';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface categoriasPromps {
  categorias: CategoriaType[]
  text: string
}

const HomeCategorias = ({ categorias, text } : categoriasPromps) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 4 : 3;
  };

  const [displayCount, setDisplayCount] = useState<number>(getDisplayCount());

  const navigate = useNavigate();

  useEffect(() => {
    setOffset(0);
    const handleResize = () => setDisplayCount(getDisplayCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categorias]);

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      let newOffset = offset - displayCount;
      if (newOffset < 0) {
        newOffset = categorias.length - (categorias.length % displayCount || displayCount);
        if (newOffset === categorias.length) {
          newOffset -= displayCount;
        }
      }
      setOffset(newOffset);
    }
  };

  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      let newOffset = offset + displayCount;
      if (newOffset >= categorias.length) {
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
        let newOffset = offset + direction * displayCount;

        if (newOffset < 0) {
          newOffset = categorias.length - (categorias.length % displayCount || displayCount);
          if (newOffset === categorias.length) {
            newOffset -= displayCount;
          }
        } else if (newOffset >= categorias.length) {
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

  const handleCardClick = (categoria: CategoriaType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/categorias/${categoria.codigo}`);
  };

  const handleVerTodos = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/categorias`);
  };

  const currentPage = Math.floor(offset / displayCount) + 1;
  const totalPages = Math.ceil(categorias.length / displayCount);

  return (
    <div className="home-categorias-section">
      <div className='home-categorias-container'>
        <section
          className='home-categorias-main'
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className='home-categorias-main-titleVerMas'>
            <h3>{text}</h3>
            <p onClick={handleVerTodos}>Ver Todos</p>
          </div>
          <div className="home-categorias-main-cardContainer">
            {categorias.slice(offset, offset + displayCount).map((item: CategoriaType) => (
            <div className="home-categorias-main-card" key={item.codigo} onClick={() => handleCardClick(item)}>
              <img
                className="home-categorias-main-card-img"
                src={item.url}
                alt={`${item.categorias} image`}
              />
              <h4>{item.categorias}</h4>
            </div>
            ))}
          </div>
          <div className='home-categorias-scroll-arrows'>
            <button className='home-categorias-scroll-left' onClick={scrollLeft}>
              <i className="bi bi-caret-left"></i>
            </button>
            <div className='home-categorias-cardsCount'>
              {currentPage} / {totalPages}
            </div>
            <button className='home-categorias-scroll-right' onClick={scrollRight}>
              <i className="bi bi-caret-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeCategorias;
