import { useEffect, useState, ReactNode } from 'react';
import { Universo } from '../../types/Universos';
import UniversosContext from './UniversoContext';
// Provider component to wrap your application
export default function PerfumesProvider({ children }: { children: ReactNode }) {
    const [universos, setUniversos] = useState<Universo[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
            const response = await fetch('http://localhost:5000/universos/')
                if (!response.ok) {
                    throw new Error('Failed to fetch perfumes from the server');
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
