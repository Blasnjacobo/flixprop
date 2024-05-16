import { useContext } from 'react';
import UniversosContext from './UniversosContext';

export default function useUniverso() {
    return useContext(UniversosContext)
}