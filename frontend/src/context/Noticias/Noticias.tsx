import { useEffect, useState, ReactNode } from 'react';
import { Noticias } from '../../types/Noticias';
import NoticiasContext from './NoticiasContext';
// Provider component to wrap your application
export default function NoticiasProvider({ children }: { children: ReactNode }) {
    const [noticias, setNoticias] = useState<Noticias[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
            const response = await fetch('http://localhost:5000/noticias/')
                if (!response.ok) {
                    throw new Error('Failed to fetch perfumes from the server');
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
