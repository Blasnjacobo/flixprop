import React, { useRef, useState, useEffect } from 'react';
import useProductos from '../../context/Productos/useProductos';
import { Producto } from '../../types/Productos';
import Productos from './Productos';

const MasVendido = () => {
  const [masVendidoProductos, setMasVendidoProductos] = useState<Producto[]>([]);
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
      setMasVendidoProductos(productos.filter(product => product.masVendido === "TRUE"));
    }
  }, [productos]);

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      let newOffset = offset - displayCount;
      if (newOffset < 0) {
        newOffset = masVendidoProductos.length - (masVendidoProductos.length % displayCount || displayCount); // Wrap to the end
      }
      setOffset(newOffset);
    }
  };

  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      const displayCount = getDisplayCount();
      let newOffset = offset + displayCount;
      if (newOffset >= masVendidoProductos.length) {
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
          newOffset = masVendidoProductos.length - (masVendidoProductos.length % displayCount || displayCount); // Wrap to the end
        } else if (newOffset >= masVendidoProductos.length) {
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

  const getDisplayCount = () => {
    return window.innerWidth >= 960 ? 4 : 2;
  };

  return (
    <div className='home-productos'>
      <div className='home-productos-container'>
        <h3 className='home-productos-container-title'>LO MAS VENDIDO</h3>
        <section
          className='home-productos-main'
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {masVendidoProductos.slice(offset, offset + getDisplayCount()).map((producto) => (
            <Productos key={producto.codigo} producto={producto} />
          ))}
        </section>
        <div className='scroll-arrows'>
          <button className='scroll-left' onClick={scrollLeft}>
            <i className="bi bi-caret-left"></i>
          </button>
          <div className='home-productos-cardsCount'>
              {Math.ceil(offset / getDisplayCount()) + 1} / {Math.ceil(masVendidoProductos.length / getDisplayCount())}
          </div>
          <button className='scroll-right' onClick={scrollRight}>
            <i className="bi bi-caret-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasVendido;
