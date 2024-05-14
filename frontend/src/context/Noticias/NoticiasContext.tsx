import { createContext } from 'react';
import { Noticia } from '../../types/Noticias';

type NoticiasContextType = {
    noticias: Noticia[];
};

const NoticiasContext = createContext({} as NoticiasContextType);
export default NoticiasContext;