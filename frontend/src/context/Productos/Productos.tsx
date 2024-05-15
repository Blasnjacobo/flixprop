import { useEffect, useState, ReactNode } from 'react';
import { Producto } from '../../types/Productos';
import ProductosContext from './ProductosContext';
// Provider component to wrap your application
export default function ProductosProvider({ children }: { children: ReactNode }) {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
            const response = await fetch('http://localhost:5000/productos/', {
                method: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Private-Network': 'true'
                        }
            })
                if (!response.ok) {
                    throw new Error('Failed to fetch productos from the server');
                }
                const data = await response.json();
                setProductos(data.data);
            } catch (error) {
                console.error('Error fetching store items:', error);
            }
        };
        fetchStoreItems();
    }, []);
    return (
        <ProductosContext.Provider value={{ productos }}>
            {children}
        </ProductosContext.Provider>
    );
}
