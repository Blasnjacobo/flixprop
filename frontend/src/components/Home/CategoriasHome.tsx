import { useState, useEffect, useRef } from 'react';
import categoriasHomeData from '../../assets/categoriasHome/categoriasHome.json';

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  img1: string;
  img2: string;
  img3: string;
}

const CategoriasHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 3);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 3);
    } else if (touchEndX.current - touchStartX.current > 50) {

      setCurrentImageIndex(prevIndex => (prevIndex + 2) % 3); 
    }
  };

  return (
    <div className="categoriasHome" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <h1 className='categoriasHome-categorias'>CATEGORIAS</h1>
      <div className='categoriasHome-container'>
        {categoriasHomeData.map((item: Categoria) => (
          <div className="card" key={item.id}>
            <img
              className="card-img-top"
              src={item[`img${currentImageIndex + 1}` as keyof Categoria]} // Type assertion here
              alt={`${item.nombre} image`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriasHome;
