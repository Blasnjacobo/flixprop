import { useEffect, useState, ReactNode } from 'react';
import { Universo } from '../../types/Universos';
import UniversosContext from './UniversosContext';
// Provider component to wrap your application
export default function UniversosProvider({ children }: { children: ReactNode }) {
    const [universos, setUniversos] = useState<Universo[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
            const response = await fetch('http://localhost:5000/universos/')
            // const response = await fetch('https://flixprop-production.up.railway.app/universos/')
                if (!response.ok) {
                    throw new Error('Failed to fetch universos from the server');
                }
                const data = await response.json();
                setUniversos(data.data);
            } catch (error) {
                console.error('Error fetching store items:', error);
            }
        };
        fetchStoreItems();
    }, []);
    return (
        <UniversosContext.Provider value={{ universos }}>
            {children}
        </UniversosContext.Provider>
    );
}
