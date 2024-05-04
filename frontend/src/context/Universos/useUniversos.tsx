import { useContext } from 'react';
import UniversosContext from './UniversoContext';

export default function useUniverso() {
    return useContext(UniversosContext)
}