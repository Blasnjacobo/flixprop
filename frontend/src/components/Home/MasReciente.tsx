import React, { useRef, useState, useEffect } from 'react';
// import { Producto } from '../../types/Productos';
import useProductos from '../../context/Productos/useProductos'
import  {Producto } from '../../types/Productos'


const MasReciente = () => {
  const [ masRecienteProductos, setMasRecienteProductos] = useState<Producto[]>([])
  const { productos } = useProductos()
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    setOffset(0);
  }, [productos]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setMasRecienteProductos(productos.filter(product => product.masReciente === "TRUE"))
    }
  }, [productos])

  const scrollLeft = () => {
    if (containerRef.current && !hasScrolled) {
      const newOffset = Math.max(offset - 1, 0); // Ensure the new offset is not less than 0
      if (newOffset !== offset) {
        setOffset(newOffset);
      }
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current && !hasScrolled) {
      const newOffset = Math.min(offset + 1, productos.length - getDisplayCount()); // Ensure the new offset is within bounds
      if (newOffset !== offset) {
        setOffset(newOffset);
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
      const deltaX = touchMoveX - touchStartX;

      const direction = deltaX > 0 ? -1 : 1; 
  
      if (Math.abs(deltaX) > 100) {
        let cardsMoved = direction; 
  
        if (offset + cardsMoved < 0) {
          cardsMoved = -offset;
        }
  
        if ((offset + cardsMoved >= 0) && (offset + cardsMoved <= productos.length - getDisplayCount())) {
          setOffset(offset + cardsMoved);
          setTouchStartX(null);
        }
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
          <button className='scroll-left' onClick={scrollLeft}><i className="bi bi-caret-left"></i></button>
          <div>Flixprop</div>
          <button className='scroll-right' onClick={scrollRight}><i className="bi bi-caret-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default MasReciente;
