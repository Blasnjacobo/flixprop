import { createContext } from 'react';
import { Noticias } from '../../types/Noticias';

type NoticiasContextType = {
    noticias: Noticias[];
};

const NoticiasContext = createContext({} as NoticiasContextType);
export default NoticiasContext;