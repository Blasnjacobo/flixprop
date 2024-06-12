import { useEffect, useState, ReactNode } from 'react';
import { Categoria } from '../../types/Categorias';
import CategoriasContext from './CategoriasContext';
// Provider component to wrap your application
export default function CategoriasProvider({ children }: { children: ReactNode }) {
    const [categorias, setCategoria] = useState<Categoria[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
            // const response = await fetch('http://localhost:5000/categoria/')
            const response = await fetch('https://flixprop-production.up.railway.app/categorias/')
                if (!response.ok) {
                    throw new Error('Failed to fetch Categoria from the server');
                }
                const data = await response.json();
                setCategoria(data.data);
            } catch (error) {
                console.error('Error fetching store items:', error);
            }
        };
        fetchStoreItems();
    }, []);
    return (
        <CategoriasContext.Provider value={{ categorias }}>
            {children}
        </CategoriasContext.Provider>
    );
}
