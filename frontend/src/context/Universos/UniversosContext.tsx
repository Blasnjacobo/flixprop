import { createContext } from 'react';
import { Universo } from '../../types/Universos';

type UniversosContextType = {
    universos: Universo[];
};

const UniversosContext = createContext({} as UniversosContextType);
export default UniversosContext;