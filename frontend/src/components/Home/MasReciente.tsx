import React, { useRef, useState, useEffect } from 'react';
import useProductos from '../../context/Productos/useProductos';
import { Producto } from '../../types/Productos';

const MasReciente = () => {
  const [masRecienteProductos, setMasRecienteProductos] = useState<Producto[]>([]);
  const { productos } = useProductos();
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    setOffset(0);
  }, [productos]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setMasRecienteProductos(productos.filter(product => product.masReciente === "TRUE"));
    }
  }, [productos]);

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      let newOffset = offset - displayCount;
      if (newOffset < 0) {
        newOffset = masRecienteProductos.length - (masRecienteProductos.length % displayCount || displayCount); // Wrap to the end
      }
      setOffset(newOffset);
    }
  };

  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      let newOffset = offset + displayCount;
      if (newOffset >= masRecienteProductos.length) {
        newOffset = 0; // Wrap to the start
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
          newOffset = masRecienteProductos.length - (masRecienteProductos.length % displayCount || displayCount); // Wrap to the end
        } else if (newOffset >= masRecienteProductos.length) {
          newOffset = 0; // Wrap to the start
        }

        setOffset(newOffset);
        setTouchStartX(null);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleCardClick = (link: string) => {
    window.location.href = link;
  };

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 4 : 2;
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
          {masRecienteProductos.slice(offset, offset + getDisplayCount()).map((producto) => (
            <div className='masVendido-card' key={producto.codigo} onClick={() => handleCardClick(producto.link)}>
              <h3 className='masVendido-universo-card'>{producto.universo}</h3>
              <img
                alt={producto.universo}
                src={producto.imgEscena}
                onMouseOver={(e) => { e.currentTarget.src = producto.imgProducto }}
                onMouseOut={(e) => { e.currentTarget.src = producto.imgEscena }}
              />
              <div className='masVendido-titulo-card'>{producto.nombre}</div>
              <div className='masVendido-provedor-card'>{producto.vendedor}</div>
              <div className='masVendido-precio-card'>${producto.precio}.00 MXN</div>
            </div>
          ))}
        </section>
        <div className='scroll-arrows'>
          <button className='scroll-left' onClick={scrollLeft}>
            <i className="bi bi-caret-left"></i>
          </button>
          <div>Flixprop</div>
          <button className='scroll-right' onClick={scrollRight}>
            <i className="bi bi-caret-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasReciente;
