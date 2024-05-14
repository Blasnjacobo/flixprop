import { useContext } from 'react';
import ProductosContext from './ProductosContext';

export default function useProductos() {
    return useContext(ProductosContext)
}