import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useUniversos from "../context/Universos/useUniversos";
import useProductos from '../context/Productos/useProductos';
import useNoticias from '../../src/context/Noticias/useNoticias';

import HomeProductos from "../components/Home/HomeProductos";
import Productos from "../components/Productos";
import type { Noticia as NoticiaType } from '../types/Noticias';
import type { Universo as UniversoType } from '../types/Universos';
import { Producto } from '../types/Productos';

import universoBanner from '../assets/Universos/universoBanner.jpg';
import '../css/UniversosPage.css';
import HomeUniversos from "../components/Home/HomeUniversos";

const Universo = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const universos = useUniversos().universos;
  const { noticias } = useNoticias()
  const universo = universos.find((universo: UniversoType) => universo.codigo === codigo);
  const { productos } = useProductos();

  const [universoProducts, setUniversoProducts] = useState<Producto[]>([]);
  const [universoNoticias, setUniversoNoticias] = useState<NoticiaType[]>([]);
  const [otrosUniversos, setOtrosUniversos] = useState<UniversoType[]>([]);


  const [sortOption, setSortOption] = useState('');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 960);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 16;

  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState(0); 
  const scrollSpeed = 320; 
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 960);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProductos = () => {
      try {
        if (universo) {
          const filteredProducts = productos.filter(producto => producto.universo === universo.universo);
          setUniversoProducts(filteredProducts);
          const filteredNoticias = noticias.filter(noticia=> noticia.universo === universo.universo)
          setUniversoNoticias(filteredNoticias)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchOtrosUniversos = () => {
      try {
        if (universo) {
          const filteredOtrosUniversos = universos.filter(element => element !== universo);
          setOtrosUniversos(filteredOtrosUniversos);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductos();
    fetchOtrosUniversos()
  }, [universo, productos]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    const sortedProducts = [...universoProducts];

    switch (selectedOption) {
      case 'alphabetical-asc':
        sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'alphabetical-desc':
        sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'price-asc':
        sortedProducts.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
        break;
      default:
        break;
    }

    setUniversoProducts(sortedProducts);
  };

  const handleScrollLeft = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentPage((prevPage) => {
      const maxPage = Math.ceil(universoProducts.length / productsPerPage) - 1;
      return Math.min(prevPage + 1, maxPage);
    });
  };

  const displayedProducts = universoProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  /* Noticias */
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

  const handleCardClickSlider = (noticia: NoticiaType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/flixprop/noticias/${noticia.codigo}`);
  };

  return (
    <div className="universoProducts-section">
      <div className="universoProducts-container">
        <section className="universoProducts-banner">
          <img src={universoBanner} alt={`${universo?.universo} banner`} />
        </section>
        {universoProducts.length > 0 && (
          <section className="universoProducts-productos-container">
            <div className="universoProducts-productos-filter">
              <div className="universoProducts-productos-select">
                <label htmlFor="sort-options">Ordenar por:</label>
                <select id="sort-options" value={sortOption} onChange={handleSortChange}>
                  <option value="" disabled>Seleccione una opción</option>
                  <option value="alphabetical-asc">Alfabéticamente, A-Z</option>
                  <option value="alphabetical-desc">Alfabéticamente, Z-A</option>
                  <option value="price-asc">Precio, menor a mayor</option>
                  <option value="price-desc">Precio, mayor a menor</option>
                </select>
              </div>
              {isWideScreen && (
                <div>
                  {`${universoProducts.length} productos`}
                </div>
              )}
            </div>
            <div className="universoProducts-productos-main">
              {displayedProducts.map((producto) => (
                <Productos key={producto.codigo} producto={producto} />
              ))}
            </div>
            <div className='scroll-arrows'>
              <button className='scroll-left' onClick={handleScrollLeft}>
                <i className="bi bi-caret-left"></i>
              </button>
              <div className='home-productos-cardsCount'>
                {currentPage + 1} / {Math.ceil(universoProducts.length / productsPerPage)}
              </div>
              <button className='scroll-right' onClick={handleScrollRight}>
                <i className="bi bi-caret-right"></i>
              </button>
            </div>
          </section>
        )}
        {universoNoticias.length > 0 && (
        <section className='home-noticias-section'>
          <div className='home-noticias-container'>
            <h3 className='home-noticias-container-text'>Noticias</h3>
            <section className='home-noticias-main' ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              {universoNoticias
              .slice(offset, offset + 3)
              .map((noticia) => (
                <div className='home-noticias-card' key={noticia.codigo} onClick={() => handleCardClickSlider(noticia)}>
                  <img src={noticia.img} alt={noticia.universo} />
                  <div className='home-noticias-card-description'>
                    <h6 className='home-noticias-universo-card'>{noticia.universo}</h6>
                    <h6 className='home-noticias-titulo-card'>{noticia.titulo}</h6>
                  </div>
                </div>
              ))}
            </section>
            {universoNoticias.length > 3 && (
            <div className='scroll-arrows'>
              <button className='scroll-left' onClick={scrollLeft}><i className="bi bi-caret-left"></i></button>
              {getDisplayCount() === 3 ? (
                <div className='home-noticias-cardsCount'>
                  Flixprop
                </div>
              ) : (
                <div className='home-noticias-cardsCount'>
                  Flixprop
                </div>
              )}
              <button className='scroll-right' onClick={scrollRight}><i className="bi bi-caret-right"></i></button>
            </div>
            )}
          </div>
        </section>
        )}
        {universoNoticias.length > 0 && (
        <section className='home-noticias-section'>
          <div className='home-noticias-container'>
            <h3 className='home-noticias-container-text'>Creadores de Contenido</h3>
            <section className='home-noticias-main' ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              {universoNoticias
              .slice(offset, offset + 3)
              .map((noticia) => (
                <div className='home-noticias-card' key={noticia.codigo} onClick={() => handleCardClickSlider(noticia)}>
                  <img src={noticia.img} alt={noticia.universo} />
                  <div className='home-noticias-card-description'>
                    <h6 className='home-noticias-universo-card'>{noticia.universo}</h6>
                    <h6 className='home-noticias-titulo-card'>{noticia.titulo}</h6>
                  </div>
                </div>
              ))}
            </section>
            {universoNoticias.length > 3 && (
            <div className='scroll-arrows'>
              <button className='scroll-left' onClick={scrollLeft}><i className="bi bi-caret-left"></i></button>
              {getDisplayCount() === 3 ? (
                <div className='home-noticias-cardsCount'>
                  Flixprop
                </div>
              ) : (
                <div className='home-noticias-cardsCount'>
                  Flixprop
                </div>
              )}
              <button className='scroll-right' onClick={scrollRight}><i className="bi bi-caret-right"></i></button>
            </div>
            )}
          </div>
        </section>
        )}
        <div>
          <h1 className="universoProducts-banner-text">Explora otros universos</h1>
          <HomeUniversos universos={otrosUniversos} text=""/>
        </div>
        <HomeProductos productos={productos} text="TE PODRIA INTERESAR"/>
      </div>
    </div>
  );
};

export default Universo;
