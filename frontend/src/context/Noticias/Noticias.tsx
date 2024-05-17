import { useEffect, useState, ReactNode } from 'react';
import { Noticia } from '../../types/Noticias';
import NoticiasContext from './NoticiasContext';
// Provider component to wrap your application
export default function NoticiasProvider({ children }: { children: ReactNode }) {
    const [noticias, setNoticias] = useState<Noticia[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
            const response = await fetch('http://localhost:5000/noticias/')
            // const response = await fetch('https://flixprop-production.up.railway.app/noticias/')
                if (!response.ok) {
                    throw new Error('Failed to fetch noticias from the server');
                }
                const data = await response.json();
                setNoticias(data.data);
                console.log(noticias)
            } catch (error) {
                console.error('Error fetching store items:', error);
            }
        };
        fetchStoreItems();
    }, []);
    return (
        <NoticiasContext.Provider value={{ noticias }}>
            {children}
        </NoticiasContext.Provider>
    );
}
