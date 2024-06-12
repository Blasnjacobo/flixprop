import { createContext } from 'react';
import { Categoria } from '../../types/Categorias';

type CategoriasContextType = {
    categorias: Categoria[];
};

const CategoriasContext = createContext({} as CategoriasContextType);
export default CategoriasContext;