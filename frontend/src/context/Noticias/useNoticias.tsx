import { useContext } from 'react';
import NoticiasContext from './NoticiasContext';

export default function useNoticias() {
    return useContext(NoticiasContext)
}