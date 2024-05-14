import { createContext } from 'react';
import { Producto } from '../../types/Productos';

type ProductosContextType = {
    productos: Producto[];
};

const ProductosContext = createContext({} as ProductosContextType);
export default ProductosContext;