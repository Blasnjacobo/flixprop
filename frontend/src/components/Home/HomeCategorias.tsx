// import categoriasHomeData from '../../assets/categoriasHome/categoriasHome.json';
import type { Categoria as CategoriaType } from '../../types/Categorias';
import useCategorias from '../../context/Categorias/useCategorias';


const HomeCategorias = () => {

  const { categoria } = useCategorias()
  console.log(categoria)
  return (
    <div className="colecciones">
      <div className='colecciones-container'>
        {categoria.map((item: CategoriaType) => (
          <div className="colecciones-card" key={item.codigo}>
            <img
              className="colecciones-card-img"
              src={item.url}
              alt={`${item.categorias} image`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategorias;
