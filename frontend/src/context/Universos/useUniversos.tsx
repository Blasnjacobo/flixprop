import { createContext } from 'react';
import { Universo } from '../../types/Universos';

type UniversosContextType = {
    universos: Universo[];
};

const PerfumesContext = createContext({} as UniversosContextType);
export default PerfumesContext;