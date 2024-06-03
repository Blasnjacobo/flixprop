import { useParams } from "react-router-dom";
import useNoticias from '../../src/context/Noticias/useNoticias';
import type { Noticia as NoticiaType } from '../types/Noticias';
import '../css/NoticiasItem.css'
import flixprop from '../assets/flixpropFondo.jpg'

const Noticia = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const noticias = useNoticias().noticias;
  const noticia = noticias.find((noticia: NoticiaType) => noticia.codigo === codigo);

  if (!noticia) {
    return <div>Noticia no encontrada</div>;
  }

  console.log(noticia)

  return (
    <div className="noticiasItem-section">
      <div className="noticiasItem-container">
        <section className="noticiasItem-intro">
          <p>{noticia.titulo}</p>
          <img src={noticia.img} alt={`Imagen de ${noticia.universo}`} />
          <h5>{noticia.fecha}</h5>
          <div className="noticiasItem-author">
            <img src={flixprop} alt="" />
            <h4>Equipo Flixprop</h4>
          </div>
        </section>
        <section>
          Hola
        </section>
      </div>
      
    </div>
  )
}

export default Noticia
