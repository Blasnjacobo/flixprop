import { useParams } from "react-router-dom";
import useNoticias from '../../src/context/Noticias/useNoticias';
import type { Noticia as NoticiaType } from '../types/Noticias';

const Noticia = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const noticias = useNoticias().noticias;
  const noticia = noticias.find((noticia: NoticiaType) => noticia.codigo === codigo);

  if (!noticia) {
    return <div>Noticia no encontrada</div>;
  }

  console.log(noticia)

  return (
    <div>
      {noticia.descripcion}
    </div>
  )
}

export default Noticia
