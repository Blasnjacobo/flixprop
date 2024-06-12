import { createContext } from 'react';
import { Categoria } from '../../types/Categorias';

type CategoriasContextType = {
    categoria: Categoria[];
};

const CategoriasContext = createContext({} as CategoriasContextType);
export default CategoriasContext;