import categoriasHome from '../../assets/categoriasHome/categoriasHome.json';

const CategoriasHome = () => {
  return (
    <div className="categoriasHome-container">
      <h1>Categorias</h1>
      {categoriasHome.map(item => (
          <div className="card" key={item.id}>
            <img className="card-img-top" src={item.img2} alt={`${item.nombre} image`} />
            <div className="card-body">
              <h2 className="card-title">{item.nombre}</h2>
              <p className="card-text">{item.descripcion}</p>
            </div>
          </div>
      ))}
    </div>
  );
}

export default CategoriasHome;
