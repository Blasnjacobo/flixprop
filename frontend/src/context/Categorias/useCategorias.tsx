import { useContext } from 'react';
import CategoriasContext from './CategoriasContext';

export default function useCategorias() {
    return useContext(CategoriasContext)
}