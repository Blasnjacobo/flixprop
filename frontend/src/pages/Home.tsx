// import HomeCategorias from '../components/Home/HomeCategorias'
import HomeProductos from '../components/Home/HomeProductos'
import HomeNoticias from '../components/Home/HomeNoticias'
import Ofrecemos from '../components/Ofrecemos'
import HomeSlider from '../components/Home/HomeSlider'
import HomeUniversos from '../components/Home/HomeUniversos'

import useUniverso from '../context/Universos/useUniversos';
import useNoticias from '../context/Noticias/useNoticias';
import useProductos from '../context/Productos/useProductos';
import useCategorias from '../context/Categorias/useCategorias';

import { useState, useEffect } from 'react'
import { Producto } from '../types/Productos'

import '../css/HomePage.css'
import HomeCategorias from '../components/Home/HomeCategorias'

const Home = () => {
  const { universos } = useUniverso();
  const { noticias } = useNoticias()
  const { productos } = useProductos();
  const { categorias } = useCategorias();

  const [masRecienteProductos, setMasRecienteProductos] = useState<Producto[]>([]);
  const [masVendidoProductos, setMasVendidoProductos] = useState<Producto[]>([]);

  
  const masRecienteText = 'NUEVOS PROPS'
  const masVendidoText = 'LO MAS VENDIDO'

  useEffect(() => {
    if (productos && productos.length > 0) {
      setMasRecienteProductos(productos.filter(product => product.masReciente === "TRUE"));
    }
  }, [productos]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setMasVendidoProductos(productos.filter(product => product.masVendido === "TRUE"));
    }
  }, [productos]);

  return (
    <div className='home-container'>
      <HomeSlider />
      <HomeProductos productos={masRecienteProductos} text={masRecienteText} />
      <HomeUniversos universos={universos} text='Universos'/>
      <HomeProductos productos={masVendidoProductos} text={masVendidoText} />
      <HomeCategorias categorias={categorias} text='Categorias' />
      <HomeNoticias noticias={noticias} />
      <Ofrecemos />
    </div>
  )
}

export default Home