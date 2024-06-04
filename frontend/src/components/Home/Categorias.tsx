import { useState, useEffect } from 'react';
import categoriasHomeData from '../../assets/categoriasHome/categoriasHome.json';

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  img1: string;
  img2: string;
  img3: string;
}

const Categorias = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 3);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="colecciones">
      <div className='colecciones-container'>
        {categoriasHomeData.map((item: Categoria) => (
          <div className="colecciones-card" key={item.id}>
            <img
              className="colecciones-card-img"
              src={item[`img${currentImageIndex + 1}` as keyof Categoria]} // Type assertion here
              alt={`${item.nombre} image`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
