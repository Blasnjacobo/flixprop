import { useParams } from "react-router-dom";
import useUniversos from "../context/Universos/useUniversos";
import useProductos from '../context/Productos/useProductos';
import type { Universo as UniversoType } from '../types/Universos';
import { Producto } from '../types/Productos';
import { useEffect, useState } from "react";
import '../UniversosPage.css';
import universoBanner from '../assets/Universos/universoBanner.jpg';
import Productos from "../components/Home/Productos";

const Universos = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const universos = useUniversos().universos;
  const universo = universos.find((universo: UniversoType) => universo.codigo === codigo);
  const { productos } = useProductos();

  const [universoProducts, setUniversoProducts] = useState<Producto[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 960);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 16;

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
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductos();
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
        <section className="universoProducts-noticias-creadores"></section>
        <section className="universoProducts-noticias-creadores"></section>
        <section className="universoProducts-interesarte"></section>
      </div>
    </div>
  );
};

export default Universos;
