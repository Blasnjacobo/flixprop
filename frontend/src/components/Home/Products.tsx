import { useRef, useState } from 'react';
import { Producto } from '../../types/Productos';

interface ProductsProps {
  productos: Producto[];
}

const Products = ({ productos }: ProductsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const scrollSpeed = 300; // Adjust the scroll speed as needed

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft -= scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds
    }
  };

  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      containerRef.current.scrollLeft += scrollSpeed;
      setHasScrolled(true);
      setTimeout(() => {
        setHasScrolled(false);
      }, 500); // Reset hasScrolled after 500 milliseconds
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
    <div className='home-masVendido'>
      <div className='home-masVendido-container'>
        <section
          className='home-masVendido-main'
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {productos.map((producto) => (
            <div className='masVendido-card' key={producto.id} onClick={() => handleCardClick(producto.link)}>
              <h3 className='masVendido-universo-card'>{producto.universo}</h3>
              <img
                src={producto.imgProducto}
                alt={producto.universo}
                onMouseOver={(e) => (e.currentTarget.src = producto.imgEscena)}
                onMouseOut={(e) => (e.currentTarget.src = producto.imgProducto)}
              />
              <div className='masVendido-titulo-card'>{producto.titulo}</div>
              <div className='masVendido-provedor-card'>{producto.provedor}</div>
              <div className='masVendido-precio-card'>${producto.precio}.00 MXN</div>
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

export default Products;
